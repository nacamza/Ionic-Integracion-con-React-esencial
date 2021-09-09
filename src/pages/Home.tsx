import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFooter,
    useIonViewWillEnter,
    IonItem,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonListHeader,
    IonLabel, IonAlert,
} from '@ionic/react';
import {logoIonic} from 'ionicons/icons';
import React from 'react';
import './Home.css';

import axios from 'axios';

interface State {
    mensajes: Mensaje[],
    shwoAlert: boolean,
}

interface Mensaje {
    "id": number,
    "asunto": string,
    "mensaje": string,
    "name": string,
    "user_id": number
}

const HomePage: React.FC = () => {
  const API_URL = 'http://dev.contanimacion.com/api_tablon/api/mensajes';
  const [state, setState] = React.useState({
      mensajes: [],
      shwoAlert: false,
  });
  const miUsuario = 'Jorge';

  useIonViewWillEnter(() => {
    axios.get(API_URL).then(response => response.data)
        .then((data) => {
          console.log("recibidos datos", data);
          setState({
              mensajes: data,
              shwoAlert: false
          })
            localStorage.setItem('tablon.mensajes', JSON.stringify(data));
        })
        .catch( (error) => {
            const data:any = JSON.parse(localStorage.getItem('tablon.mensajes') || '{}');
            setState({
                mensajes: data,
                shwoAlert: true
            });
        })
  });

  const items = state.mensajes.map( (mensaje:Mensaje, index) => {
        const slotMine = miUsuario === mensaje.name ? 'end' : '';
        const colorMine = miUsuario === mensaje.name ? 'danger' : 'primary';
        const userRoute = '/mensajes-usuario/' + mensaje.user_id;
      return (
          <IonItem key={index} color='none' className='bg-transparent' routerLink={userRoute}>
              <div className='item-note' slot={slotMine}>
                  <IonCard color='light'>
                      <IonCardHeader>
                          <IonCardSubtitle color={colorMine}>
                              {mensaje.name}
                          </IonCardSubtitle>
                          <IonCardTitle>
                              {mensaje.asunto}
                          </IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                          <p>{mensaje.mensaje}</p>
                      </IonCardContent>
                  </IonCard>
              </div>
          </IonItem>
      )
  })

  return (
    <IonPage className='home'>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tablón</IonTitle>
          <IonIcon slot='end' icon={logoIonic} className='logo'/>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonList lines='none' className='bg-transparent'>
              <IonListHeader>
                  <IonLabel>Todos los mensajes</IonLabel>
              </IonListHeader>
              {items}
          </IonList>
          <IonAlert
              header = 'Conexión'
              message = 'No hay conexión a internet'
              isOpen = {state.shwoAlert}
              buttons= {['Aceptar']}
          />
      </IonContent>
      <IonFooter>
        <IonToolbar color='primary'>
          <IonTitle>
            © Jorge
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default HomePage;
