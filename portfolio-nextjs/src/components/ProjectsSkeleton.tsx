export default function ProjectsSkeleton() {
  return (
    <section className="projects__section" id="ProjectContainer" aria-busy="true">
      <div className="container projects_container">
        <div className="section__header">
          <h1 className="section__title">Đồ Án Thực Chiến</h1>
          <p className="section__description">Đang tải danh sách dự án...</p>
        </div>

        <div className="project__cards_container">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="projects__cards projects__cards--skeleton">
              <div className="projects__cards_wrapper">
                <div className="projects__skeleton_block projects__skeleton_img" />
              </div>
              <div className="projects__cards_titles">
                <div className="projects__cards_info projects__cards_info--skeleton">
                  <div className="projects__skeleton_block projects__skeleton_subtitle" />
                  <div className="projects__skeleton_block projects__skeleton_title" />
                  <div className="projects__tech_stack">
                    <span className="projects__skeleton_block projects__skeleton_badge" />
                    <span className="projects__skeleton_block projects__skeleton_badge" />
                  </div>
                </div>
                <div className="projects__cards_links">
                  <span className="projects__skeleton_block projects__skeleton_link" />
                  <span className="projects__skeleton_block projects__skeleton_link" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
