import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

export const coversLoader = async () => {
  const response = await axios.get("http://localhost:5000/api/covers");
  return response.data.covers;
};

const CoversContainer = () => {
  const covers = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className="mt-10 bg-gray-secondary">
      <h4 className="block  py-4 pl-2 border-b-8 border-red-default">
        New on the site
      </h4>
      <div className="grid gap-3 grid-cols-3 ">
        {covers.map((cover) => {
          const { _id, slug, name, type, genre, poster } = cover;
          return (
            <div key={_id} className="flex bg-gray-primary">
              <img
                src={`http://localhost:5000/files/${poster.path}`}
                alt={name}
                onClick={() => navigate(`/covers/${_id}`)}
                className="cursor-pointer"
              />
              <div className="ml-2 mt-2">
                <h5
                  className="mb-1 text-lg cursor-pointer hover:text-red-default transition-all"
                  onClick={() => navigate(`/covers/${_id}`)}
                >
                  {name}
                </h5>
                <p className="mb-1">{type}</p>
                <p>{genre}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CoversContainer;
