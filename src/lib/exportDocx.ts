import { FullUser } from "./types";

export async function exportUserAsDocx(user: FullUser): Promise<void> {
  const docx = await import("docx");
  const {
    Document,
    Paragraph,
    TextRun,
    HeadingLevel,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
    AlignmentType,
    Packer,
  } = docx;
  const { saveAs } = await import("file-saver");

  const { userInfo, userContact, userAddress, userAcademics } = user;
  const fullName = `${userInfo.firstName} ${userInfo.lastName}`;

  const sectionHeading = (title: string) =>
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 100 },
    });

  const labelValue = (label: string, value: string | null | undefined) => {
    if (!value) return null;
    return new Paragraph({
      children: [
        new TextRun({ text: `${label}: `, bold: true, size: 22 }),
        new TextRun({ text: value, size: 22 }),
      ],
      spacing: { after: 60 },
    });
  };

  // Use any[] to avoid type issues with union of Paragraph | Table from dynamic import
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const children: any[] = [];

  // Title
  children.push(
    new Paragraph({
      text: fullName,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: userInfo.occupation,
          color: "2563EB",
          size: 26,
          bold: true,
        }),
      ],
    })
  );

  // Personal Info
  children.push(sectionHeading("Personal Information"));
  const personalFields = [
    labelValue("First Name", userInfo.firstName),
    labelValue("Last Name", userInfo.lastName),
    labelValue("Date of Birth", new Date(userInfo.dob).toLocaleDateString("en-GB")),
    labelValue("Gender", userInfo.gender),
    labelValue("Occupation", userInfo.occupation),
  ].filter(Boolean);
  children.push(...personalFields);

  // Contact
  if (userContact) {
    children.push(sectionHeading("Contact Details"));
    const contactFields = [
      labelValue("Email", userContact.email),
      labelValue("Phone", userContact.phoneNumber),
      labelValue("Fax", userContact.fax),
      labelValue("LinkedIn", userContact.linkedInUrl),
    ].filter(Boolean);
    children.push(...contactFields);
  }

  // Address
  if (userAddress) {
    children.push(sectionHeading("Address"));
    const addressFields = [
      labelValue("Street", userAddress.address),
      labelValue("City", userAddress.city),
      labelValue("State", userAddress.state),
      labelValue("Country", userAddress.country),
      labelValue("Zip Code", userAddress.zipCode),
    ].filter(Boolean);
    children.push(...addressFields);
  }

  // Academics
  if (userAcademics && userAcademics.length > 0) {
    children.push(sectionHeading("Education"));

    const cellStyle = {
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "BFDBFE" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "BFDBFE" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "BFDBFE" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "BFDBFE" },
      },
    };

    const headerRow = new TableRow({
      children: ["School", "Degree", "Field of Study", "Period"].map(
        (label) =>
          new TableCell({
            ...cellStyle,
            children: [
              new Paragraph({
                children: [new TextRun({ text: label, bold: true, size: 20 })],
              }),
            ],
            width: { size: 25, type: WidthType.PERCENTAGE },
          })
      ),
    });

    const dataRows = userAcademics.map(
      (a) =>
        new TableRow({
          children: [
            a.schoolName,
            a.degree || "—",
            a.fieldOfStudy || "—",
            `${a.startYear || "?"} – ${a.endYear || "Present"}`,
          ].map(
            (val) =>
              new TableCell({
                ...cellStyle,
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: val, size: 20 })],
                  }),
                ],
                width: { size: 25, type: WidthType.PERCENTAGE },
              })
          ),
        })
    );

    children.push(
      new Table({
        rows: [headerRow, ...dataRows],
        width: { size: 100, type: WidthType.PERCENTAGE },
      })
    );
  }

  const doc = new Document({
    sections: [{ children }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${fullName.replace(/\s+/g, "_")}_Profile.docx`);
}
