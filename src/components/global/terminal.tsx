"use client";

import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

export function Terminal() {
    const cv = `{
  "basics": {
    "name": "Faizal Anwar",
    "label": "Data Analyst | Junior Fullstack Developer | IT Support",
    "email": "fzlanwr@gmail.com",
    "phone": "+62 813-1209-1820",
    "location": {
      "city": "Cirebon",
      "postalCode": "45183",
      "country": "Indonesia"
    },
    "linkedin": "https://linkedin.com/in/faizalanwar",
    "github": "https://github.com/faizalanwar",
    "portfolio": "https://drive.google.com/drive/folders/1E79aTGqgtoihkTxdC3Hqxg9kxxAOStX_"
  },
  "summary": "Lulusan S1 Teknik Informatika (IPK 3,72) dengan keahlian di data analysis, web development, dan IT support. Berpengalaman mengelola data skala besar, membangun aplikasi web, dan memberikan solusi teknis efektif.",
  "education": [
    {
      "institution": "Universitas XYZ",
      "area": "Teknik Informatika",
      "studyType": "S1",
      "gpa": "3.72",
      "startDate": "2014-08",
      "endDate": "2018-07"
    }
  ],
  "interests": [
    "Data Analysis",
    "Web Development",
    "IT Support",
    "Teknologi Inovatif"
  ]
}
`;


    const skill = `{
  "skills": [
    {
      "name": "Design Tools",
      "keywords": [
        "Adobe Illustrator",
        "Photoshop",
        "InDesign",
        "CorelDRAW",
        "Figma",
        "Canva"
      ]
    },
    {
      "name": "Web Development",
      "keywords": [
        "Laravel",
        "Livewire",
        "MySQL",
        "PostgreSQL",
        "Git & GitHub",
        "React",
        "Next.js"
      ]
    },
    {
      "name": "Productivity",
      "keywords": [
        "Microsoft Word",
        "Excel",
        "PowerPoint",
        "PowerBI"
      ]
    },
    {
      "name": "Networking",
      "keywords": [
        "LAN",
        "TCP/IP",
        "Router & Switch Configuration"
      ]
    }
  ]
}
`;
    const experience = `{
  "experience": [
    {
      "company": "Dinas Sosial Kota Cirebon",
      "position": "Staf – Pengelola Bimbingan Sosial",
      "startDate": "2023-01",
      "endDate": "Present",
      "summary": "Mengelola anggaran, menangani pengaduan publik, dan memproses data DTKS dalam jumlah besar."
    },
    {
      "company": "Naskahkode (Freelance)",
      "position": "Web & Graphic Designer",
      "startDate": "2018-01",
      "endDate": "Present",
      "summary": "Membangun website dan materi visual sesuai kebutuhan klien."
    },
    {
      "company": "BLK Annadwah Buntet Pesantren",
      "position": "Instruktur Desain",
      "startDate": "2019-01",
      "endDate": "2020-12",
      "summary": "Mengajar desain grafis dan praktik percetakan."
    },
    {
      "company": "Telkom Indonesia Sindanglaut",
      "position": "Magang",
      "startDate": "2017-06",
      "endDate": "2017-08",
      "summary": "Instalasi jaringan, fiber optic, dan layanan pelanggan."
    }
  ]
}
`;

    return (
        <div className="max-w-4xl mx-auto w-full">
            <CodeBlock
                language="jsx"
                filename="DummyComponent.jsx"
                tabs={[
                    { name: "Curiculum Vitae.json", code: cv, language: "json" },
                    {
                        name: "Skill.json",
                        code: skill,
                        language: "json",
                        highlightLines: [1, 2, 3],
                    }, {
                        name: "Experience.json",
                        code: experience,
                        language: "json",
                        highlightLines: [1, 2, 3],
                    },
                ]}
            />
        </div>
    );
} 