import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import styled from "styled-components";
import { useState } from "react";

const MainBoxPosts = () => {
  const user = useSelector((state: RootState) => state.userState.user);
  const [showModel, setShowModel] = useState(false);
  const handelClick = () => {
    setShowModel(!showModel);
  };
  return (
    <Container>
      <ShareBox>
        <div>
          {user && user.photoURL ? (
            <img src={user.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button>Start a post</button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" alt="" />
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
      <Content></Content>
      <PostModel />
    </Container>
  );
};

const Container = styled.div``;
const CommonCard = styled.div``;
const ShareBox = styled(CommonCard)``;
const Content = styled.div``;
const PostModel = styled.div``;
export default MainBoxPosts;
