import { FullUser } from "./types";

export async function exportUserAsPdf(user: FullUser): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const { userInfo, userContact, userAddress, userAcademics } = user;
  const fullName = `${userInfo.firstName} ${userInfo.lastName}`;

  // Header background
  doc.setFillColor(30, 58, 95); // navy
  doc.rect(0, 0, 210, 45, "F");

  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(fullName, 15, 22);

  // Occupation
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(147, 197, 253);
  doc.text(userInfo.occupation, 15, 32);

  // Email in header
  if (userContact?.email) {
    doc.setFontSize(9);
    doc.setTextColor(191, 219, 254);
    doc.text(userContact.email, 15, 40);
  }

  let y = 55;

  const sectionTitle = (title: string) => {
    doc.setFillColor(239, 246, 255);
    doc.rect(10, y - 4, 190, 8, "F");
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(title.toUpperCase(), 15, y + 1);
    y += 8;
  };

  const field = (label: string, value: string | null | undefined) => {
    if (!value) return;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(75, 85, 99);
    doc.setFontSize(9);
    doc.text(`${label}:`, 15, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(17, 24, 39);
    doc.text(value, 55, y);
    y += 6;
  };

  // Personal Info
  sectionTitle("Personal Information");
  y += 2;
  field("First Name", userInfo.firstName);
  field("Last Name", userInfo.lastName);
  field("Date of Birth", new Date(userInfo.dob).toLocaleDateString("en-GB"));
  field("Gender", userInfo.gender);
  field("Occupation", userInfo.occupation);
  y += 4;

  // Contact
  if (userContact) {
    sectionTitle("Contact Details");
    y += 2;
    field("Email", userContact.email);
    field("Phone", userContact.phoneNumber);
    if (userContact.fax) field("Fax", userContact.fax);
    if (userContact.linkedInUrl) field("LinkedIn", userContact.linkedInUrl);
    y += 4;
  }

  // Address
  if (userAddress) {
    sectionTitle("Address");
    y += 2;
    field("Street", userAddress.address);
    field("City", userAddress.city);
    field("State", userAddress.state);
    field("Country", userAddress.country);
    field("Zip Code", userAddress.zipCode);
    y += 4;
  }

  // Academics
  if (userAcademics && userAcademics.length > 0) {
    sectionTitle("Education");
    y += 4;

    autoTable(doc, {
      startY: y,
      head: [["School", "Degree", "Field", "Period"]],
      body: userAcademics.map((a) => [
        a.schoolName,
        a.degree || "—",
        a.fieldOfStudy || "—",
        `${a.startYear || "?"} – ${a.endYear || "Present"}`,
      ]),
      headStyles: {
        fillColor: [30, 58, 95],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 9,
      },
      bodyStyles: { fontSize: 9, textColor: [17, 24, 39] },
      alternateRowStyles: { fillColor: [239, 246, 255] },
      margin: { left: 15, right: 15 },
    });
  }

  doc.save(`${fullName.replace(/\s+/g, "_")}_Profile.pdf`);
}
