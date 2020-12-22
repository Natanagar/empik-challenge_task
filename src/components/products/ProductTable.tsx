import React from 'react';
import { useHistory } from 'react-router-dom';
import { ProductInfo } from '../../model/api/getCart';
import * as paths from '../../router/paths';
import { Table, Checkbox, Button, Tooltip, Popconfirm } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface ProductTableProps {
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
    render: (_: any, text: any) => (
      <Tooltip title="Dodaj do koszyka" color="blue">
        <Checkbox disabled defaultChecked={text.isBlocked} />
      </Tooltip>
    ),
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
      const history = useHistory();
      return (
        <Popconfirm
          title="Dodaj towar do koszyka?"
          onConfirm={() => {
            history.push(paths.CART);
          }}
          okText="Tak"
        >
          <Button shape="circle">
            <ShoppingCartOutlined />
          </Button>
        </Popconfirm>
      );
    },
  },
];

const ProductTable: React.FC<ProductTableProps> = ({ itemsList }) => {
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
export default ProductTable;
