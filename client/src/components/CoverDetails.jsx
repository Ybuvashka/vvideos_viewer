import axios from "axios";
import { useLoaderData } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";

export const coverDetailsLoader = async ({ params }) => {
  const { slug } = params;
  const response = await axios.get(`http://localhost:5000/api/covers/${_id}`);
  return response.data.cover;
};

const CoverDetails = () => {
  const cover = useLoaderData();
  const { name, type, genre, poster, description } = cover;

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    experimentalSvgIcons: true,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },

    sources: [
      {
        src: `http://localhost:5000/files/Dandadan/Dandadan%20-%2001%20[1080p]%20[Amanogawa].mp4`,
        type: "video/mp4",
      },
    ],
  };
  return (
    <>
      <h5 className="mb-1 text-4xl mt-10 text-red-default">{name}</h5>
      <div className="bg-gray-primary mt-3">
        <img
          src={`http://localhost:5000/files/${poster.path}`}
          alt={name}
          className="max-h-[350px] float-left mr-4 mb-4"
        />
        <div>
          <p className="mb-1"><span className="text-red-default">
          Type:
          </span>
           {type}</p>
          <p><span className="text-red-default">
          Genre:
          </span> {genre}</p>
          <p><span className="text-red-default">
          Description:
          </span> {description}</p>
        </div>
      </div>
      <div className="my-5">
        <VideoPlayer
          options={videoJsOptions}
          onReady={() => console.log("The video is ready to play")}
        />
      </div>
    </>
  );
};
export default CoverDetails;
