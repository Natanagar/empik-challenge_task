import React from 'react';
import { ProductInfo } from '../../model/api/getCart';
import { Table, Checkbox } from 'antd';

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
    key: 'isBlocked',
    dataIndex: 'isBlocked',
    render: (_: any, text: any) => {
      console.log(text);
      return <Checkbox disabled defaultChecked={text.isBlocked} />;
    },
  },
  {
    title: 'Iłość sztuk w magazynie',
    key: 'quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Dodać do koszyka',
    key: 'opetation',
    dataIndex: 'operation',
    render: (_: any, text: any) => {
      console.log(text);
      return <div>Operation</div>;
    },
  },
];

const ProductPage: React.FC<ProductPageProps> = ({ itemsList }) => {
  console.log(itemsList);
  const productsList = itemsList.map((item: ProductInfo) => ({
    name: item.name,
    quantity: item.max,
    isBlocked: Boolean(item.isBlocked),
    availability: item.max > 0 ? 'tak' : 'towar jest niedostępny',
  }));
  console.log(productsList);

  return <Table bordered columns={defaultColumns} dataSource={productsList} />;
};
export default ProductPage;
