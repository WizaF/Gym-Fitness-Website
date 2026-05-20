export default function Home() {
  const gif_link = props.link;
  const exe_name = props.name;
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      {scrollToBottom()}
      {/* <h1>Scheduling</h1> */}
      <div className="Card-parent">
        <div className="Card">
          <div className="Card-image">
            <picture>
              <source srcSet={gif_link} />
              <img src={gif_link} alt="Chest Press" key="Chest" />
            </picture>
            <div className="Desc">
              <div className="Card-Name">
                <h3 className="ex_name">{exe_name}</h3>
                <h3 className="no_of_set">4 × 12</h3>
              </div>
              <hr />
              <p>
                <i>
                  It is a compound exercise that involves the pectoralis major
                  of the chest, the anterior deltoids of the shoulder, and the
                  triceps brachii of the upper arm.
                </i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
