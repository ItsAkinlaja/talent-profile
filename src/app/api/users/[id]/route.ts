import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { CreateUserPayload } from "@/lib/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const supabase = createServerClient();
    const { id } = await params;

    const { data: info, error: infoError } = await supabase
      .from("UserInfoTB")
      .select("*")
      .eq("id", id)
      .single();

    if (infoError || !info) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const [contactRes, addressRes, academicsRes] = await Promise.all([
      supabase.from("UserContactTB").select("*").eq("userId", id).single(),
      supabase.from("UserAddressTB").select("*").eq("userId", id).single(),
      supabase
        .from("UserAcademicsTB")
        .select("*")
        .eq("userId", id)
        .order("startYear", { ascending: false }),
    ]);

    return NextResponse.json({
      userInfo: info,
      userContact: contactRes.data,
      userAddress: addressRes.data,
      userAcademics: academicsRes.data || [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const supabase = createServerClient();
    const { id } = await params;
    const body: Partial<CreateUserPayload> = await req.json();
    const { userInfo, userContact, userAddress, userAcademics } = body;

    const updateTasks: Promise<unknown>[] = [];

    if (userInfo) {
      updateTasks.push(
        Promise.resolve(
          supabase
            .from("UserInfoTB")
            .update({
              ...(userInfo.firstName && { firstName: userInfo.firstName }),
              ...(userInfo.lastName && { lastName: userInfo.lastName }),
              ...(userInfo.dob && { dob: userInfo.dob }),
              ...(userInfo.occupation && { occupation: userInfo.occupation }),
              ...(userInfo.gender && { gender: userInfo.gender }),
              ...(userInfo.profilePhoto !== undefined && {
                profilePhoto: userInfo.profilePhoto,
              }),
              updatedAt: new Date().toISOString(),
            })
            .eq("id", id)
        )
      );
    }

    if (userContact) {
      updateTasks.push(
        Promise.resolve(
          supabase
            .from("UserContactTB")
            .update({
              ...(userContact.email && { email: userContact.email }),
              ...(userContact.phoneNumber && {
                phoneNumber: userContact.phoneNumber,
              }),
              fax: userContact.fax || null,
              linkedInUrl: userContact.linkedInUrl || null,
              updatedAt: new Date().toISOString(),
            })
            .eq("userId", id)
        )
      );
    }

    if (userAddress) {
      updateTasks.push(
        Promise.resolve(
          supabase
            .from("UserAddressTB")
            .update({
              ...(userAddress.address && { address: userAddress.address }),
              ...(userAddress.city && { city: userAddress.city }),
              ...(userAddress.state && { state: userAddress.state }),
              ...(userAddress.country && { country: userAddress.country }),
              ...(userAddress.zipCode && { zipCode: userAddress.zipCode }),
              updatedAt: new Date().toISOString(),
            })
            .eq("userId", id)
        )
      );
    }

    if (userAcademics) {
      updateTasks.push(
        (async () => {
          await supabase.from("UserAcademicsTB").delete().eq("userId", id);
          if (userAcademics.length > 0) {
            await supabase.from("UserAcademicsTB").insert(
              userAcademics.map((a) => ({
                userId: id,
                schoolName: a.schoolName,
                degree: a.degree || null,
                fieldOfStudy: a.fieldOfStudy || null,
                startYear: a.startYear || null,
                endYear: a.endYear || null,
              }))
            );
          }
        })()
      );
    }

    await Promise.all(updateTasks);

    const [infoRes, contactRes, addressRes, academicsRes] = await Promise.all([
      supabase.from("UserInfoTB").select("*").eq("id", id).single(),
      supabase.from("UserContactTB").select("*").eq("userId", id).single(),
      supabase.from("UserAddressTB").select("*").eq("userId", id).single(),
      supabase
        .from("UserAcademicsTB")
        .select("*")
        .eq("userId", id)
        .order("startYear", { ascending: false }),
    ]);

    return NextResponse.json({
      userInfo: infoRes.data,
      userContact: contactRes.data,
      userAddress: addressRes.data,
      userAcademics: academicsRes.data || [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  try {
    const supabase = createServerClient();
    const { id } = await params;

    const { error } = await supabase
      .from("UserInfoTB")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
