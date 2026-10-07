import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { CreateUserPayload } from "@/lib/types";

export async function GET() {
  try {
    const supabase = createServerClient();

    const { data: userInfos, error } = await supabase
      .from("UserInfoTB")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) throw error;

    const fullUsers = await Promise.all(
      (userInfos || []).map(async (info) => {
        const [contactRes, addressRes, academicsRes] = await Promise.all([
          supabase
            .from("UserContactTB")
            .select("*")
            .eq("userId", info.id)
            .single(),
          supabase
            .from("UserAddressTB")
            .select("*")
            .eq("userId", info.id)
            .single(),
          supabase
            .from("UserAcademicsTB")
            .select("*")
            .eq("userId", info.id)
            .order("startYear", { ascending: false }),
        ]);

        return {
          userInfo: info,
          userContact: contactRes.data,
          userAddress: addressRes.data,
          userAcademics: academicsRes.data || [],
        };
      })
    );

    return NextResponse.json(fullUsers);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient();
    const body: CreateUserPayload = await req.json();
    const { userInfo, userContact, userAddress, userAcademics } = body;

    // Insert UserInfoTB
    const { data: createdInfo, error: infoError } = await supabase
      .from("UserInfoTB")
      .insert({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        dob: userInfo.dob,
        occupation: userInfo.occupation,
        gender: userInfo.gender,
        profilePhoto: userInfo.profilePhoto || null,
      })
      .select()
      .single();

    if (infoError) throw infoError;

    const userId = createdInfo.id;

    // Insert related tables in parallel
    const [contactRes, addressRes, academicsRes] = await Promise.all([
      supabase
        .from("UserContactTB")
        .insert({
          userId,
          email: userContact.email,
          phoneNumber: userContact.phoneNumber,
          fax: userContact.fax || null,
          linkedInUrl: userContact.linkedInUrl || null,
        })
        .select()
        .single(),
      supabase
        .from("UserAddressTB")
        .insert({
          userId,
          address: userAddress.address,
          city: userAddress.city,
          state: userAddress.state,
          country: userAddress.country,
          zipCode: userAddress.zipCode,
        })
        .select()
        .single(),
      userAcademics.length > 0
        ? supabase
            .from("UserAcademicsTB")
            .insert(
              userAcademics.map((a) => ({
                userId,
                schoolName: a.schoolName,
                degree: a.degree || null,
                fieldOfStudy: a.fieldOfStudy || null,
                startYear: a.startYear || null,
                endYear: a.endYear || null,
              }))
            )
            .select()
        : Promise.resolve({ data: [], error: null }),
    ]);

    if (contactRes.error) throw contactRes.error;
    if (addressRes.error) throw addressRes.error;
    if (academicsRes.error) throw academicsRes.error;

    return NextResponse.json(
      {
        userInfo: createdInfo,
        userContact: contactRes.data,
        userAddress: addressRes.data,
        userAcademics: academicsRes.data || [],
      },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
