"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Profile } from "@/types/profile";

export default function AboutMe() {
  const [profile, setProfile] = useState<Partial<Profile>>({
    aboutMe:
      "Em chào anh chị! Em là sinh viên mới tốt nghiệp ngành CNTT và. Em có niềm đam mê với công việc lập trình và yêu thích việc tạo ra các trang web và mobile app hiện đại có tính ứng dụng cao.",
    cvUrl: "/assets/HoangVanTrong_FullstackDeveloper_Intern.pdf",
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data: Profile) => setProfile(data))
      .catch(() => {});
  }, []);

  return (
    <section className="aboutMe__section">
      <Image
        src="/assets/rocket-icon.svg"
        alt="rocket icon"
        width={300}
        height={300}
        priority
      />
      <Image
        src="/assets/laptop.png"
        alt="laptop icon"
        width={300}
        height={300}
        priority
      />

      <div className="aboutMe__container">
        <div className="aboutMe__content_container">
          <h1 className="section__title">Giới thiệu bản thân</h1>
          <p className="section__description">{profile.aboutMe}</p>
          <div className="CTA">
            <a
              href={
                profile.cvUrl ||
                "/assets/HoangVanTrong_FullstackDeveloper_Intern.pdf"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="primaryButton"
              download
            >
              Tải CV
            </a>
            <a href="#ProjectContainer" className="outlineButton">
              Xem Dự Án
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
