import {
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon, IonItem, IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
    IonLabel,
    IonButton,
} from '@ionic/react';
import {
    logoIonic,
} from 'ionicons/icons';
import React from 'react';
import axios from "axios";
import './Usuarios.css';

interface State {
    usuarios: Usuario[]
}

interface Usuario {
    "id": number,
    "email": string,
    "name": string,
}


const UsuariosPage: React.FC = () => {
    const API_URL = 'http://dev.contanimacion.com/api_tablon/api/users';
    const [state, setState] = React.useState({
        usuarios: []
    });

    useIonViewWillEnter(() => {
        axios.get(API_URL).then(response => response.data)
            .then((data) => {
                console.log("recibidos datos", data);
                setState({
                    usuarios: data
                })
            })
    });

    const items = state.usuarios.map( (usuario:Usuario, index) => {
        const userRoute = '/mensajes-usuario/' + usuario.id;
        return (
            <IonItem key={index} color='none' className='bg-transparent' >
                <IonLabel>
                    <h3>{usuario.name}</h3>
                    <p>{usuario.email}</p>
                </IonLabel>
                <IonButton slot='end' size='default' color='danger'
                routerLink={userRoute}>mensajes</IonButton>
            </IonItem>
        )
    })

  return (
      <IonPage className='usuarios'>
          <IonHeader>
              <IonToolbar color='success'>
                  <IonButtons slot="start">
                      <IonMenuButton />
                  </IonButtons>
                  <IonTitle>Usuarios</IonTitle>
                  <IonIcon slot='end' icon={logoIonic} className='logo'/>
              </IonToolbar>
          </IonHeader>
          <IonContent>
              <IonList lines='full' inset={true}>
                  {items}
              </IonList>
          </IonContent>
          <IonFooter>
              <IonToolbar color='success'>
                  <IonTitle>
                      © Jorge
                  </IonTitle>
              </IonToolbar>
          </IonFooter>
      </IonPage>
  );
};

export default UsuariosPage;
