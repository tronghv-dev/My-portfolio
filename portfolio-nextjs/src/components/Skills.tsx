import Image from "next/image";

const techIcons = [
  { src: "/assets/icons/html.svg", alt: "Html icon", label: "Html" },
  { src: "/assets/icons/github.svg", alt: "Github icon", label: "Github" },
  { src: "/assets/icons/css.svg", alt: "Css icon", label: "Css" },
  { src: "/assets/icons/java.svg", alt: "Java icon", label: "Java" },
  { src: "/assets/icons/C.svg", alt: "C icon", label: "C" },
  { src: "/assets/icons/nextjs.svg", alt: "NextJS icon", label: "NextJS" },
  { src: "/assets/icons/JS.svg", alt: "JS icon", label: "JS" },
  { src: "/assets/icons/node-js.svg", alt: "Node.js icon", label: "Node.js" },
  {
    src: "/assets/icons/postgresql.svg",
    alt: "PostgresSql icon",
    label: "PostgresSql",
  },
  { src: "/assets/icons/react.svg", alt: "React icon", label: "React" },
];

function IconList() {
  return (
    <div className="icons-list">
      {techIcons.map((icon) => (
        <div key={icon.label} className="icons-badges">
          <Image
            src={icon.src}
            alt={icon.alt}
            width={32}
            height={32}
            style={{ width: "auto" }}
          />
          <span>{icon.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section className="skills__section">
      <div className="container skills__container">
        {/* header */}
        <div className="section__header">
          <h1 className="section__title">Kỹ năng &amp; Chuyên Môn</h1>
          <p className="section__description">
            Là một nhà phát triển web mới vào nghề, em có nền tảng vững chắc về
            các framework front-end như React và thư viện NextJS. Bên cạnh đó là
            kinh nghiệm là việc với các công nghệ back-end như Node.js và
            Express.
          </p>
        </div>

        {/* grid */}
        <div className="skills__grid_container">
          {/* grid item 1 — decorative cat image via CSS */}
          <div className="skills__grid_item" />

          {/* grid item 2 — scrolling tech icons */}
          <div className="skills__grid_item">
            <div className="skills__grid_item_header">
              <div>
                <Image
                  src="/assets/check-icon.svg"
                  alt="check-icon"
                  width={24}
                  height={24}
                  style={{ width: "auto" }}
                />
                <h2>Công cụ và công nghệ</h2>
              </div>
              <p>
                Là một nhà phát triển web mới vào nghề, em có nền tảng vững chắc
                về các framework front-end như React và thư viện NextJS. Bên
                cạnh đó là kinh nghiệm là việc với các công nghệ back-end như
                Node.js và Express.
              </p>
            </div>

            <div>
              {/* list 1 — moves left */}
              <div className="icons_list-wrapper">
                <IconList />
                <IconList />
              </div>

              {/* list 2 — moves right */}
              <div className="icons_list-wrapper">
                <IconList />
                <IconList />
              </div>
            </div>
          </div>

          {/* grid item 3 — soft skills */}
          <div className="skills__grid_item">
            <div className="skills__grid_item_header">
              <div>
                <Image
                  src="/assets/check-icon.svg"
                  alt="check-icon"
                  width={24}
                  height={24}
                  style={{ width: "auto" }}
                />
                <h2>Kỹ năng mềm</h2>
              </div>
              <p>
                Kỹ năng giao tiếp, cộng tác và giải quyết vấn đề xuất sắc, với
                thái độ chủ động và ham học hỏi, dễ dàng thích nghi với môi
                trường làm việc nhóm năng động.
              </p>
            </div>
            <div className="softSkills_container">
              <div className="softSkills_badge">
                <p>Giao tiếp chuyên nghiệp</p>
              </div>
              <div className="softSkills_badge">
                <p>Quản lý thời gian hiệu quả</p>
              </div>
              <div className="softSkills_badge">
                <p>Đáng tin cậy</p>
              </div>
              <div className="softSkills_badge">
                <p>Ham học hỏi</p>
              </div>

              <div className="softSkills__book_icons">
                <Image
                  src="/assets/closed-book.svg"
                  alt="closed-book icon"
                  width={40}
                  height={40}
                />
                <Image
                  src="/assets/closed-book.svg"
                  alt="closed-book icon"
                  width={40}
                  height={40}
                />
                <Image
                  src="/assets/closed-book.svg"
                  alt="closed-book icon"
                  width={40}
                  height={40}
                />
                <Image
                  src="/assets/closed-book.svg"
                  alt="closed-book icon"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>

          {/* grid item 4 — decorative cat image via CSS */}
          <div className="skills__grid_item" />
        </div>
      </div>
    </section>
  );
}
