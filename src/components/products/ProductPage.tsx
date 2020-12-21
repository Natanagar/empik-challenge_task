import React from 'react';
import { ProductInfo } from '../../model/api/getCart';
import { Table } from 'antd';

interface ProductPageProps {
  itemsList: ProductInfo[];
}

const defaultColumns = [
  {
    title: 'Nazwa productu',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Czy jest dostępny product',
    key: 'availability',
    dataIndex: 'availability',
  },
  {
    title: 'Czy product jest zablokowany',
    key: 'isBlock',
    dataIndex: 'isBlock',
  },
  {
    title: 'Iłość sztuk w magazynie',
    key: 'quantity',
    dataIndex: 'quantity',
  },
];

const ProductPage: React.FC<ProductPageProps> = ({ itemsList }) => {
  console.log(itemsList);
  const productsList = itemsList.map((item: ProductInfo) => {
    console.log(item);
    return {
      name: item.name,
    };
  });
  console.log(productsList);

  return <Table bordered columns={defaultColumns} dataSource={[]} />;
};
export default ProductPage;
