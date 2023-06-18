import Layout from "@/layout/layout";
import React, { useEffect, useState } from "react";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Image } from 'primereact/image';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';

import { useRouter } from 'next/router';

//--> Componentes propios
import { mostrarFlores,verFavoritos } from '@/components/mensajesNotificaciones/links';

const Favoritos = () => {
  const router = useRouter();

  const token = localStorage.getItem('token')
  const cabecera = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  //----------------| Lista de variables flores |----------------
  const [flores, setFlores] = useState([])
  //--> Ejecucion en segundo planos
  useEffect(() => {
    axios.get(verFavoritos,cabecera).then(res => { setFlores(res.data.fleurs) })
  }, [])
  
  const [selectedFlor, setSelectedFlor] = useState(null);
  const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
  const [eliminarExitoso, setEliminarExitoso] = useState(false);

  useEffect(() => {
    const datosFlores = [
      {
        nombre: "Rosa", precio: 5.90, categoria: "primavera", estatus: "Disponible",
        imagen: "https://png.pngtree.com/png-vector/20210710/ourmid/pngtree-close-up-of-rose-simulation-growth-png-image_3580749.jpg", descripcion: "Descripcion de rosa"
      },
      {
        nombre: "Tulipan", precio: 6.20, categoria: "otoño", estatus: "Agotado",
        imagen: "https://w7.pngwing.com/pngs/666/928/png-transparent-tulip-free-content-flower-georgia-bulldogs-leaf-heart-computer-wallpaper.png",
        descripcion: "Descripcion de tulipan"
      },
      {
        nombre: "Girasol", precio: 3.50, categoria: "invierno", estatus: "Pocos",
        imagen: "https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg",
        descripcion: "Descripcion de girasol"
      },
      {
        nombre: "Setosa", precio: 25.23, categoria: "primavera", estatus: "Pocos",
        imagen: "https://img1.freepng.es/20180314/vbq/kisspng-bird-echeveria-agavoides-echeveria-setosa-graptope-lotus-design-material-5aa973bd8fb253.3676960215210546535886.jpg", descripcion: "Descripcion de setosa"
      },
      {
        nombre: "Gardenia", precio: 78.60, categoria: "verano", estatus: "Disponible",
        imagen: "https://us.123rf.com/450wm/rprongjai/rprongjai1910/rprongjai191000001/131915934-flores-de-gardenia-sobre-fondo-blanco.jpg?ver=6", descripcion: "Descripcion de gardenia"
      },
      {
        nombre: "VersicolorP", precio: 84.69, categoria: "verano", estatus: "Agotado",
        imagen: "https://img2.freepng.es/20180409/wce/kisspng-cut-flowers-iris-versicolor-iris-5acb7fdb4bc3d7.6318569115232859793103.jpg", descripcion: "Descripcion de versicolor"
      },
    ];
    setFlores(datosFlores);
  }, []);

  const getSeverity = (flor) => {
    switch (flor.estatus) {
      case 'Disponible':
        return 'success';

      case 'Pocos':
        return 'warning';

      case 'Agotado':
        return 'danger';

      default:
        return null;
    }
  };

  const eliminar = () => {
    const filteredFlores = flores.filter((f) => f.nombre !== selectedFlor.nombre);
    setFlores(filteredFlores);
    setSelectedFlor(null);
    setConfirmationDialogVisible(false);
    setEliminarExitoso(true);
  };

  const confirmarEliminar = (flor) => {
    setSelectedFlor(flor);
    setConfirmationDialogVisible(true);
  };

  const itemTemplate = (flor) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round shadow-5 border-round" src={flor.imagen} alt="girasol" />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start">
              <div className="text-2xl font-bold text-900">{flor.nombre}</div>
              <span className="text-2xl font-semibold sh">${flor.precio}</span>
              <div className="flex align-items-center gap-3">
                <Tag value={flor.estatus} severity={getSeverity(flor)}></Tag>
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{flor.categoria}</span>
                </span>
              </div>
            </div>
            <div className="">
              <h5>Descripción: </h5>
              <p>{flor.descripcion}</p>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            <Button label="Agregar" icon="pi pi-shopping-cart" className="font-light ml-2 " severity="success" disabled={flor.estatus === 'Agotado'}></Button>
              <Button label="Eliminar" onClick={() => confirmarEliminar(flor)} icon="pi pi-trash" severity="danger" aria-label="Favorite" className="font-light ml-2" />
           
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Favoritos"
      description="Compras del usuario hasta el momento"
    >
      <div className="grid">
        <div className="col-12">
          <h1>Favoritos</h1>
        </div>
        <div className="col-12">
          {eliminarExitoso && <Message severity="success" text="Producto eliminad0 exitosamente"   />}
          <div className="card">
            <DataView value={flores} itemTemplate={itemTemplate} />
          </div>
        </div>
      </div>
      <Dialog visible={confirmationDialogVisible} onHide={() => setConfirmationDialogVisible(false)} breakpoints={{ '960px': '75vw' }} header="Eliminar de Favoritos" style={{ width: '30vw' }} footer={
        <div className="p-dialog-footer">
            <Button label="Eliminar" onClick={eliminar} security="danger"  />
          <Button label="Cancelar" onClick={() => setConfirmationDialogVisible(false)} className="p-button-text" />
        </div>
      }>
       
        <p>¿Está seguro de que deseas eliminar el producto {selectedFlor?.nombre} de tus favoritos?</p>
      </Dialog>
    </Layout>
  );
};

export default Favoritos;
