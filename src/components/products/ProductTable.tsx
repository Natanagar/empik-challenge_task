import React from 'react';
import { useHistory } from 'react-router-dom';
import { ProductInfo } from '../../model/api/getCart';
import * as paths from '../../router/paths';
import { Button, Checkbox, Popconfirm, Table, Tooltip } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import putProductById from '../../model/api/putProductById';

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
      console.log(text.id);
      return (
        <Popconfirm
          title="Dodaj towar do koszyka?"
          onConfirm={() => {
            putProductById(text.id)
              .then((res: any) => console.log(res))
              .catch((err: any) => console.log(err));
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
    price: `${Math.round(Number(item.price) * 100) / 100} zł`,
    id: item.pid,
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
