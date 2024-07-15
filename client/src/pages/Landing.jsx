import Wrapper from "../assets/wrappers/LandingPage";
import Logo from '../components/Logo'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
        <ul className="nav-list">
          <li className="nav-item">Home</li>
          <li className="nav-item">Anime</li>
          <li className="nav-item">TOP 100</li>
          <li className="nav-item">Random</li>
          <li className="nav-item">Community</li>
        </ul>
      </nav>
    </Wrapper>
  );
};
export default Landing;
