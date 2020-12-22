import React, { FC, useEffect, useState } from 'react';
import { notification, Skeleton, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { History } from 'history';
import styled from 'styled-components';
import getCart, { ProductInfo } from '../../model/api/getCart';
import ProductTable from './ProductTable';
import logo from '../../ui/logo.png';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: #f5f7fb;
  min-width: 100%;
  padding: 10px;
`;

interface ProductPageProps {
  history: History;
}
const ProductPage: FC<ProductPageProps> = ({ history }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<ProductInfo[] | any[]>([]);
  useEffect(() => {
    setLoading(true);
    getCart()
      .then((res: any) => {
        setProductList(res);
        setLoading(true);
      })
      .catch((err: any) => {
        notification.error({
          message: 'Data failed',
          description: `${err.message || err[0].message}`,
        });
        setLoading(true);
      });
  }, []);
  console.log(productList);
  return (
    <>
      <StyledContainer>
        <div>
          <img src={logo} height="50px" width="80px" alt="card" />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <Badge dot>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
        </div>
      </StyledContainer>
      <ProductTable itemsList={productList} />
    </>
  );
};

export default ProductPage;
