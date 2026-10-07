import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://njqxrwdresyjbqmjdgxe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcXhyd2RyZXN5amJxbWpkZ3hlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTI4NDc3MSwiZXhwIjoyMTA2ODYwNzcxfQ.EpCeY2-09YtdNOtSnHMZLZ0llop48bCMfSeKH2xYruY"
);

const PHOTOS = [
  "https://ik.imagekit.io/scmchurch/My%20Picture.jpeg?updatedAt=1785490707410",
  "https://ik.imagekit.io/scmchurch/image.png?updatedAt=1781441962425",
  "https://ik.imagekit.io/scmchurch/WhatsApp%20Image%202026-05-20%20at%2014.44.33.jpeg?updatedAt=1779284710749",
  "https://ik.imagekit.io/scmchurch/evgeniy-smersh-zfvEzrzDVZ0-unsplash.jpg?updatedAt=1779282977261",
  "https://ik.imagekit.io/scmchurch/navy-medicine-0Cc92_aPs3A-unsplash.jpg?updatedAt=1779260289052",
  "https://ik.imagekit.io/scmchurch/geralt-hospital-10222177_1920.jpg?updatedAt=1779260168883",
  "https://ik.imagekit.io/scmchurch/ortopediatri-cocuk-ortopedi-akademisi-rXqfl7MKEJ4-unsplash.jpg?updatedAt=1779260006192",
  "https://ik.imagekit.io/scmchurch/cdc-TDoPeUSOD1c-unsplash.jpg?updatedAt=1779259949393",
  "https://ik.imagekit.io/scmchurch/cdc-GnLuuG9crEY-unsplash.jpg?updatedAt=1779259799910",
  "https://ik.imagekit.io/scmchurch/maria-luisa-queiroz-KlBltbAwxWk-unsplash.jpg?updatedAt=1779259459006",
];

async function updateAvatars() {
  console.log("Fetching all users...");

  const { data: users, error } = await supabase
    .from("UserInfoTB")
    .select("id, firstName, lastName")
    .order("createdAt", { ascending: true });

  if (error || !users) {
    console.error("Failed to fetch users:", error?.message);
    process.exit(1);
  }

  console.log(`Found ${users.length} users. Updating photos...\n`);

  for (let i = 0; i < users.length; i++) {
    const user  = users[i];
    const photo = PHOTOS[i % PHOTOS.length];

    const { error: updateError } = await supabase
      .from("UserInfoTB")
      .update({ profilePhoto: photo })
      .eq("id", user.id);

    if (updateError) {
      console.log(`  ❌  ${user.firstName} ${user.lastName} — ${updateError.message}`);
    } else {
      console.log(`  ✅  ${user.firstName} ${user.lastName}`);
    }
  }

  console.log("\nDone!");
}

updateAvatars();
