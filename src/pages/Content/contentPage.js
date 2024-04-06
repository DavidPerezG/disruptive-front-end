import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getAllContent } from '../../services/contentService';

const API_URL = 'http://localhost:3005/api/contents';

// Styled components
const PageContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ContentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ContentItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    width: calc(50% - 15px); /* Two items per row for larger screens with gap */
  }

  @media (min-width: 992px) {
    width: calc(50% - 15px); /* Two items per row for even larger screens */
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const ContentBackground = styled.div`
  width: 200px;
  height: 200px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
`;

const ContentInfo = styled.div`
  flex: 1;
  margin-left: 20px;
`;

const ContentTitle = styled.h3`
  margin-bottom: 2px;
  font-size: 18px;
`;

const ContentText = styled.p`
  margin-bottom: 0px;
`;

const VideoButton = styled.a`
  margin-top: 10px;
  display: inline-block;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function AllContentPage() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const getContent = async () => {
      try {
        const authTokenFromCookie = Cookies.get('authToken');
        const response = await getAllContent(authTokenFromCookie);
        setContent(response.data.contents);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    getContent();
  }, []);

  // Function to format createdAt date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { timeZone: 'UTC' });
  };

  return (
    <PageContainer>
      <Title>All Content</Title>
      <ContentList>
        {content.map(item => (
          <ContentItem key={item._id}>
            {item.type === 'image' && (
              <>
                <ContentBackground image={item.content}></ContentBackground>
                <ContentInfo>
                  <ContentTitle>{item.title}</ContentTitle>
                  <ContentText>Date Created: {formatDate(item.createdAt)}</ContentText>
                  <ContentText>Credits: {item.credits}</ContentText>
                  <ContentText>Type: {item.type}</ContentText>

                </ContentInfo>
              </>
            )}
            {item.type === 'video' && (
              <>
                <ContentInfo>
                  <ContentTitle>{item.title}</ContentTitle>
                  <ContentText>Date Created: {formatDate(item.createdAt)}</ContentText>
                  <ContentText>Credits: {item.credits}</ContentText>
                  <ContentText>Type: {item.type}</ContentText>

                  <VideoButton href={item.content} target="_blank" rel="noopener noreferrer">Watch Video</VideoButton>
                </ContentInfo>
              </>
            )}
            {item.type === 'text' && (
              <>
                <ContentInfo>
                  <ContentTitle>{item.title}</ContentTitle>
                  <ContentText>{item.content}</ContentText>
                  <ContentText>Date Created: {formatDate(item.createdAt)}</ContentText>
                  <ContentText>Credits: {item.credits}</ContentText>
                  <ContentText>Type: {item.type}</ContentText>

                </ContentInfo>
              </>
            )}
          </ContentItem>
        ))}
      </ContentList>
    </PageContainer>
  );
}

export default AllContentPage;
