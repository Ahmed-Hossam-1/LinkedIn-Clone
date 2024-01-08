import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Timestamp } from "firebase/firestore";
import { postArticles } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { TArticle } from "../types/type";

type TProps = {
  handelClick: () => void;
  showModel: boolean;
};

const PostModel = ({ handelClick, showModel }: TProps) => {
  const user = useAppSelector((state) => state.userState.user);
  const dispatch = useAppDispatch();
  // const artical = useSelector(
  //   (state) => state.articalState.articals
  // );

  const [editorText, setEditorText] = useState<string>("");
  const [assetArea, setAssetArea] = useState<string>("");
  const [shareImage, setShareImage] = useState<any>("");
  const [videoLink, setVideoLink] = useState<string>("");

  const handleChange = (e: any) => {
    const image = e.target.files[0];
    console.log(image);
    if (
      image === "" ||
      image === undefined ||
      image.type.split("/")[0] !== "image"
    ) {
      alert(`not an image , the file is a ${typeof image}`);
      return;
    } else {
      setShareImage(image);
    }
  };

  const handlePostArticles = (e: any) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload: TArticle = {
      image: shareImage,
      video: videoLink,
      user: user,
      description: editorText,
      timestamp: Timestamp.now(),
    };
    dispatch(postArticles(payload));
    reset();
  };
  const switchAssetArea = (area: string) => {
    // setShareImage({} as TImage);
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const reset = () => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    handelClick();
  };

  return (
    <>
      {showModel && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={() => reset()}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                {user && user.photoURL ? (
                  <img src={user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label
                        style={{
                          cursor: "pointer",
                          display: "block",
                          marginBottom: "15px",
                        }}
                        htmlFor="file"
                      >
                        Select an image to share
                      </label>
                    </p>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} alt="img" />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        style={{ width: "100%", height: "30px" }}
                        type="text"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        placeholder="Please input a video link"
                      />
                      {videoLink && (
                        <ReactPlayer
                          width="100%"
                          height="250px"
                          url={videoLink}
                        />
                      )}
                    </>
                  )
                )}
              </Editor>
            </ShareContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/share-image.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/share-video.svg" alt="video" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/share-comment.svg" alt="comment" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                onClick={(e) => handlePostArticles(e)}
                disabled={!editorText ? true : false}
              >
                Post
              </PostButton>
            </ShareCreation>
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
  width: 100%;
  height: 100%;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 99%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  align-items: center;
  h2 {
    line-height: 1.5;
    font-weight: 400;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.6);
  }
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    background: none;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
  svg,
  img {
    pointer-events: none;
  }
`;
const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  sv,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    line-height: 1.5;
    font-size: 16px;
    margin-left: 5px;
  }
`;
const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 16px 16px;
  height: 30px;
`;
const AssetButton = styled.button`
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-size: 14px;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  display: grid;
  place-items: center;
  ${AssetButton} {
    svg,
    img {
      margin-right: 5px;
    }
    padding: 10px;
    height: 30px;
    border-radius: 30px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgb(235,235,235)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgb(0,0,0,0.25)" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  font-size: 16px;
  border-radius: 30px;
  &:hover {
    background: ${(props) => (props.disabled ? "" : "#004182")};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    border: none;
    line-height: 1.5;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;
export default PostModel;
