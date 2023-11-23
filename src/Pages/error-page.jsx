import { useRouteError } from "react-router-dom";
import "../Css/error-404.css";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div className="error-mars"></div>
      <img
        src="https://assets.codepen.io/1538474/404.svg"
        className="error-logo-404"
        alt=""
      />
      <img
        src="https://assets.codepen.io/1538474/meteor.svg"
        className="error-meteor"
        alt=""
      />
      <p className="error-title">Oh no!!</p>
      <p className="error-subtitle">
        You’re either misspelling the URL <br /> or requesting a page that's no
        longer here.
      </p>
      <div className="error-center">
        <Link className="error-btn-back" to="/">
          Go Home
        </Link>
      </div>
      <img
        src="https://assets.codepen.io/1538474/astronaut.svg"
        className="error-astronaut"
        alt=""
      />
      <img
        src="https://assets.codepen.io/1538474/spaceship.svg"
        className="error-spaceship"
        alt="/"
      />
    </div>
  );
}
