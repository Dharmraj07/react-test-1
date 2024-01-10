import React, { useEffect, useState } from 'react'

const App = () => {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [list, setList] = useState([]);




  const handleDelete = (id) => {
    const updatedList = list.filter((product) => product.id !== id);
    setList(updatedList);


  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId.trim() !== "" && name.trim() !== "" && price.trim() !== "") {
      console.log(list);

      const newData = { id: Date.now(), productId, name, price };
      setList([...list, newData]);

    }

    setProductId('');
    setName('');
    setPrice('');
  }

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(list));


  }, [list])

  const totalPrice = () => {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
      total += parseInt(list[i].price);
    }
    return parseFloat(total);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <label >Product Id:</label>
        <input type="text" name="id" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <label >Product Name:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label >Selling Price:</label>
        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <button type="submit">Add Product</button>
      </form>
      <hr />
      <h3>Total value Worth of products :{totalPrice()}</h3>

      <ul>
        {
          list.map((product) => (
            <li key={product.id}>
              ${product.price}- {product.name} -{product.productId}
              <button onClick={() => handleDelete(product.id)}>delete</button>

            </li>
          ))
        }
      </ul>

    </div>
  )
}

export default App