import "../styles/Section.scss";
function Section({ title, children, style }) {
  return (
    <section className="section" style={style}>
      <p className="font-lg">{title}</p>
      {children}
    </section>
  );
}

export default Section;
