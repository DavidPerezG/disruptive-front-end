import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getAllCategories } from '../../services/categoryService';

const API_URL = 'http://localhost:3005/api/categories';

// Styled components
const PageContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const CategoryItem = styled.div`
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CategoryBackground = styled.div`
  width: 100%;
  height: 200px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
`;

const CategoryContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CategoryName = styled.h3`
  margin-bottom: 5px;
  font-size: 18px;
  color: white;
  text-align: center;
`;

const CategoryCountContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 5px;
`;

const CategoryCount = styled.p`
  padding: 0px;
  margin: 0px;
  font-size: 14px;
`;

const FormContainer = styled.div`
  margin-top: 20px;
`;

const CreateCategoryButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const authTokenFromCookie = Cookies.get('authToken');
        const response = await getAllCategories(authTokenFromCookie);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <PageContainer>
      <Title>All Categories</Title>

      <CategoryList>
        {categories.map(category => (
          <CategoryItem key={category._id}>
            <CategoryBackground image={category.cover}>
              <CategoryContent>
                <CategoryName>{category.name}</CategoryName>
                <CategoryCountContainer>
                  <CategoryCount>Videos: {category.videoCount}</CategoryCount>
                  <CategoryCount>Images: {category.imageCount}</CategoryCount>
                  <CategoryCount>Texts: {category.textCount}</CategoryCount>
                </CategoryCountContainer>
              </CategoryContent>
            </CategoryBackground>
          </CategoryItem>
        ))}
      </CategoryList>
      {showForm && (
        <FormContainer>
        </FormContainer>
      )}
    </PageContainer>
  );
}

export default CategoriesPage;
