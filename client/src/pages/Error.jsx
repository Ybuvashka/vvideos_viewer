import { useRouteError, Link } from "react-router-dom";
import img from '../assets/images/not-found.svg'

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <div className="error-wrapper">
        <img
          src={img}
          alt="error image"
          className="max-w-96"
        />
        <Link to='/' className='mt-10 ease-linear duration-300 hover:text-red-default'>Back home</Link>
      </div>
    );
  }
  return (
    <div className="error-wrapper ">
      <h3>Something went wrong</h3>
    </div>
  );
};
export default Error;
