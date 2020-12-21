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
    title: 'Cena',
    key: 'price',
    dataIndex: 'price',
    width: 100,
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
  const productsList = itemsList.map((item: ProductInfo) => ({
    name: item.name,
    quantity: item.max,
    isBlocked: Boolean(item.isBlocked),
    availability: item.max > 0 ? 'tak' : 'towar jest niedostępny',
    price: `${Number(item.price)} zł`,
  }));

  return (
    <Table
      bordered
      columns={defaultColumns}
      pagination={{
        showSizeChanger: true,
      }}
      dataSource={productsList}
    />
  );
};
export default ProductPage;
