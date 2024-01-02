import styled from "styled-components";
import { RootState } from "../redux/reducers";
import { useSelector } from "react-redux";
import { useState } from "react";
type TProps = {
  handelClick: () => void;
  showModel: boolean;
};
const PostModel = ({ handelClick, showModel }: TProps) => {
  const user = useSelector((state: RootState) => state.userState.user);
  const [editorText, setEditorText] = useState<string>("");
  return (
    <>
      {showModel && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={() => handelClick()}>
                <img src="/images/close-icon.svg" alt="Close" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {user && user.photoURL ? (
                  <img src={user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{user?.displayName && user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                  rows={5}
                  onChange={(e) => setEditorText(e.target.value)}
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <Category title="photo">
                    <img src="/images/photo-icon.svg" alt="" />
                  </Category>
                  <Category title="Video">
                    <img src="/images/video-icon.svg" alt="" />
                  </Category>
                  <Category title="event">
                    <img src="/images/event-icon.svg" alt="" />
                  </Category>
                  <Category title="article">
                    <img src="/images/article-icon.svg" alt="" />
                  </Category>
                </div>
                <SharePost>
                  <button>Post</button>
                </SharePost>
              </Editor>
            </SharedContent>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
`;
const Content = styled.div`
  width: 90%;
  max-width: 550px;
  max-height: 90%;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  button {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
`;
const SharedContent = styled.div`
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  img {
    width: 48px;
    height: 48px;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    outline: none;
    border: none;
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    font-family: "Roboto", sans-serif;
  }
`;

const Category = styled.div`
  padding: 4px 8px;
  border-radius: 15px;
  margin-top: 10px;
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const SharePost = styled.div`
  cursor: pointer;
  width: 100%;
  text-align: end;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  margin-top: 10px;
  button {
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 600;
    border: none;
    background-color: transparent;
    transition: 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      padding: 5px 10px;
    }
  }
`;
export default PostModel;
