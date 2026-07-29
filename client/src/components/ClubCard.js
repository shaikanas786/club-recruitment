import { Link } from "react-router-dom";
import "./ClubCard.css";

function ClubCard({
  image,
  title,
  description,
  id
}) {

  return (

    <div className="card shadow h-100">

      <img
        src={
          image
            ? `https://club-recruitment.onrender.com/uploads/${image}`
            : "https://via.placeholder.com/300"
        }
        alt={title}
        className="card-img-top"
        style={{
          height: "220px",
          objectFit: "cover"
        }}
      />

      <div className="card-body">

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

        <Link
          to={`/club/${id}`}
          className="btn btn-primary"
        >
          View Club
        </Link>

      </div>

    </div>

  );

}

export default ClubCard;