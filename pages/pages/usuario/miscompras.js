import Layout from "@/layout/layout"
import React, { useEffect, useState } from "react";
import { DataView } from 'primereact/dataview';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { Divider } from 'primereact/divider';

//--> Componentes propios
import { visualizarPedidos } from '@/components/mensajesNotificaciones/links';

const MisCompras = () => {

  const router = useRouter();
  const [Ordenes, setOrden] = useState([])

  const token = localStorage.getItem('token')
    const cabecera = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    useEffect(() => {
      axios.get(visualizarPedidos,cabecera).then(res => { setOrden(res.data.pedidosCliente) })
    }, [])
    const productoTemplate = (producto) => (
    <div className="col-12">

    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 ">
      <img className="w-9 sm:w-16rem xl:w-10rem  border-round" src={producto.imagen} />
      
      <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-5">
        <div className="flex flex-column align-items-center sm:align-items-start ">
          <div className="">Producto: {producto.nombre}</div>
          <span className="">Total: {producto.total}</span>
          <span className="">Cantidad: {producto.cantidad}</span>
          
          </div>
          <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
             
              
              
              <Button  label="Reembolso"  icon="pi pi-times" severity="danger" aria-label="Favorite" className="font-light ml-2"  onClick={() => { router.push('/pages/usuario/reembolsos')}} />
              <Button label="Valorar Producto" icon="pi pi-thumbs-up-fill" severity="success" className="font-light ml-2 "   onClick={() => { router.push('/pages/usuario/valoraProducto')}}> </Button>
              
                
            
              
            </div>
        
            
        
        
       
 
      </div>
    </div>
  </div>

  );




  const itemTemplate = (datosOrden) => { 

         
 

    return (
        <div className="col-12">
          <div className="shadow-2">
          <div className="col-12 flex">
          <div className="col-2" ><span className="text-xl font-semibold  ">Pedido: {datosOrden.Npedido}</span> </div>
          <Divider layout="vertical" />
          <div className="col-2" ><span className="text-xl font-semibold ">Fecha de Orden: {datosOrden.fecha}</span> </div>
          <Divider layout="vertical" />
          <div className="col-3" ><span className="text-xl font-semibold ">Total de compra: ${datosOrden.precio}</span> </div>
          <Divider layout="vertical" />
          <div className="col-3 text-xl font-semibold "><span style={{ color: 'green'}}>Entregado: {datosOrden.fechaEntrega} <i className="pi pi-check-circle" style={{ fontSize: '1.5rem' }}></i></span> </div>
          
        </div>
        <DataView value={datosOrden.productos} itemTemplate={productoTemplate} />
          
        </div>
        <div className="mb-3"></div>
        
        
        
         
      
      </div>
    );
  };

  return (
    <Layout
      title="Compras"
      description="Compras del usuario hasta el momento"
    >
      <div className="grid overflow-hidden">
        <div className="col-12">
          <h1>Historial</h1>
        </div>
        <div className="col-12">
          <div className="">
            <DataView value={Ordenes} itemTemplate={itemTemplate} />
          </div>
        </div>
        
      </div>
    </Layout>
  )
}


export default MisCompras
