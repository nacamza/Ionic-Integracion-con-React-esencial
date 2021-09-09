import {
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';
import React from 'react';
import axios from 'axios';

interface UserDetailProps {
  id: string
}

interface State {
  mensajes: Mensaje[],
  id: string,
  userName: string,
  email: string,
}

interface Mensaje {
  "id": number,
  "asunto": string,
  "mensaje": string,
  "name": string,
  "user_id": number
}

const List: React.FunctionComponent<UserDetailProps> = (props:UserDetailProps) => {
  const API_URL = 'http://dev.contanimacion.com/api_tablon/api/users/get/';

  const [state, setState] = React.useState({
    mensajes: [],
    id: '',
    userName: '',
    email: '',
  });


  React.useEffect(() => {
    const id = state.id;

    axios.get(API_URL + props.id).then(response => response.data)
        .then((data) => {
          console.log("recibidos datos", data);
          setState({
            mensajes: data[0].mensajes,
            userName: data[0].data.name,
            email: data[0].data.email,
            id: id,
          })
        })
  }, [props.id])

  const items = state.mensajes.map( (mensaje:Mensaje, index) => {
    return (
        <IonItem key={index} color='none' className='bg-transparent' >
          <div className='item-note' slot='start'>
            <IonCard color='light'>
              <IonCardHeader>
                <IonCardSubtitle color='danger'>
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
      <IonList lines='none' className='bg-transparent'>
        <IonListHeader>
          <IonLabel>{state.email}</IonLabel>
        </IonListHeader>
        {items}
      </IonList>
  )
};

export default List;
