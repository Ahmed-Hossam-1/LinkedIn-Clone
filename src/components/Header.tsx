import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../redux/app/hooks";
import { signOutAPI } from "../redux/actions";
import { useDispatch } from "react-redux";

const Header = () => {
  const user = useAppSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  return (
    <Container>
      <Content>
        <Logo>
          <Link to="/">
            <img src="/images/home-logo.svg" alt="logo" />
          </Link>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="search" />
            </SearchIcon>
          </div>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <Link to="/">
                <img src="/images/nav-home.svg" alt="home" />
                <span>Home</span>
              </Link>
            </NavList>
            <NavList>
              <Link to="/network">
                <img src="/images/nav-network.svg" alt="network" />
                <span>My Network</span>
              </Link>
            </NavList>
            <NavList>
              <Link to="/jobs">
                <img src="/images/nav-jobs.svg" alt="jobs" />
                <span>Jobs</span>
              </Link>
            </NavList>
            <NavList>
              <Link to="/messaging">
                <img src="/images/nav-messaging.svg" alt="messaging" />
                <span>Messaging</span>
              </Link>
            </NavList>
            <NavList>
              <Link to="/notifications">
                <img src="/images/nav-notifications.svg" alt="notifications" />
                <span>Notifications</span>
              </Link>
            </NavList>
            <User>
              <Link to="">
                {user && user.photoURL ? (
                  <img src={user.photoURL} alt="user" />
                ) : (
                  <img src="/images/user.svg" alt="user" />
                )}

                <span>
                  Me
                  <img src="/images/down-icon.svg" alt="down" />
                </span>
              </Link>
              <SignOut onClick={() => dispatch(signOutAPI() as any)}>
                <Link to="">Sign Out</Link>
              </SignOut>
            </User>
            <Work>
              <Link to="">
                <img src="/images/nav-work.svg" alt="work" />
                <span>
                  Work
                  <img src="/images/down-icon.svg" alt="down" />
                </span>
              </Link>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0 24px;
  z-index: 100;
  @media (max-width: 767px) {
    padding: 15px;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;
const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;
const Search = styled.form`
  position: relative;
  opacity: 1;
  flex-grow: 1;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;
const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
  }
`;
const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;
const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.6);
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;
const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  cursor: pointer;
  @media (max-width: 767px) {
    position: absolute;
    top: -45px;
    right: 15px;
    background: #eee;
  }
`;
const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${SignOut} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  @media (max-width: 575px) {
    display: none;
  }
`;

export default Header;
