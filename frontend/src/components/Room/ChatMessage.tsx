import React, { useState } from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { IFetchedPost, IFilePost } from '../../types/IPost';
import { DarkNormalText } from '../StyledComponents/Texts';
import { SVG } from '../StyledComponents/SVG';
import { TransparentButton } from '../StyledComponents/Button';
import { ALink } from '../StyledComponents/Link';

const ChatMessageListItem = styled.li`
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 235px;
  width: 50%;
  min-height: 2rem;
  margin: 0.5rem;
  background-color: ${props => props.theme.colors.alternative};
  border-radius: 1rem;
`;

const ChatMessageListItemTextContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const FileItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border-top: 2px solid black;
`;

const FileItemButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

const FileItemButton = styled.a`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

interface ToggleSVGProps {
  showFiles: boolean;
}
const ToggleSVG = styled(SVG)<ToggleSVGProps>`
  rotate: ${props => props.showFiles ? 180 : 360}deg;
  transition: rotate 0.3s ease;
`;

interface Props {
  post: IFetchedPost;
}

const VALID_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

const ChatMessage = ({post}: Props) => {
  const {message, filePosts} = post;

  const [showFiles, setShowFiles] = useState<boolean>(!message && filePosts.length > 0);

  const onClickToggleShowFiles = () => {
    const toggle = !showFiles;
    setShowFiles(toggle);
  }

  const renderFilePost = (file: IFilePost) => {
    const renderImageIfRequired = () => {
      if (VALID_IMAGE_EXTENSIONS.some(ext => file.mimeType.endsWith(ext))) {
        return <img src={file.path} alt={file.name} width={235} height={235} />;
      }

      return <DarkNormalText>{file.name}</DarkNormalText>;
    }

    const onClickDownloadHandler = () => {
      saveAs(file.path, file.name);
    }

    return (
      <FileItemContainer key={file.id}>
        {renderImageIfRequired()}
        <FileItemButtonContainer>
          <FileItemButton href={file.path} target='_blank'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          </FileItemButton>
          <FileItemButton onClick={onClickDownloadHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
              <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
          </FileItemButton>
        </FileItemButtonContainer>
      </FileItemContainer>
    );
  }

  if (!message && filePosts.length === 0) {
    return null;
  }

  const getMessageContent = () => {
    if (!!message) {
      try {
        new URL(message);
        return <ALink href={message} target='_blank'>{message}</ALink>;
      } catch (_) {
        return <DarkNormalText>{message}</DarkNormalText>;
      }
    }
    
    if (filePosts.length === 0) {
      return null;
    }

    return <DarkNormalText>{`${filePosts.length} file${filePosts.length === 1 ? '' : 's'} inside`}</DarkNormalText>;
  }

  return (
    <ChatMessageListItem>
      <ChatMessageListItemTextContainer>
        {getMessageContent()}
        {filePosts.length > 0 && (
          <TransparentButton onClick={onClickToggleShowFiles}>
            <ToggleSVG xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" showFiles={showFiles} >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </ToggleSVG>
          </TransparentButton>
        )}
      </ChatMessageListItemTextContainer>
      {showFiles && filePosts.map(renderFilePost)}
    </ChatMessageListItem>
  );
}

export { ChatMessage };
