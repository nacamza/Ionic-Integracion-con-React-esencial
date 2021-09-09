import React, {Component, FormEvent} from "react";
import {RouteComponentProps} from "react-router";
import {
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonAlert,
} from "@ionic/react";
import {logoIonic} from "ionicons/icons";
import axios from "axios";


interface State {
    asunto: string,
    mensaje: string,
    respuesta: string,
    shwoAlert: boolean
}

class NuevoPage extends Component<RouteComponentProps, State> {

    API_URL = 'http://dev.contanimacion.com/api_tablon/api/mensajes/add';
    miUsuario = 13;

    constructor(props:RouteComponentProps) {
        super(props);

        this.state = {
            asunto: '',
            mensaje: '',
            respuesta: '',
            shwoAlert: false
        }
    }

    handleAsuntoChange (e:any) {
        this.setState({
            asunto: e.target.value,
        })
    }

    handleMensajeChange (e:any) {
        this.setState({
            mensaje: e.target.value,
        })
    }

    handleSubmit(e:FormEvent) {
        e.preventDefault();
        const data = {
            user_id: this.miUsuario,
            asunto: this.state.asunto,
            mensaje: this.state.mensaje,
        }
        axios.post(this.API_URL, data).then(response => response.data)
            .then((data) => {
                console.log("recibidos datos", data);
                var respuesta;
                if (data[0].ok) {
                    respuesta = 'Respuesta correcta';
                } else {
                    respuesta = 'Error enviando datos';
                }
                console.log(respuesta);
                this.setState({
                    respuesta: respuesta,
                    shwoAlert: true,
                })

            })
    }

    render() {
        return(
            <IonPage className='home'>
                <IonHeader>
                    <IonToolbar color='primary'>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Nuevo</IonTitle>
                        <IonIcon slot='end' icon={logoIonic} className='logo'/>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard color='light'>
                        <IonCardHeader>
                            <IonCardTitle>
                                Nuevo mensaje
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <form onSubmit={(e:any) => this.handleSubmit(e)} action='post'>
                                <IonList>
                                    <IonItem>
                                        <IonLabel position='floating'>Asunto</IonLabel>
                                        <IonInput type='text' value={this.state.asunto}
                                            onInput={ (e:any) => this.handleAsuntoChange(e)} />
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position='floating'>Mensaje</IonLabel>
                                        <IonTextarea auto-grow='true' value={this.state.mensaje}
                                                     onInput={ (e:any) => this.handleMensajeChange(e)} />
                                    </IonItem>
                                </IonList>
                                <IonButton type='submit' expand='block'>Enviar</IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                    <IonAlert
                        header = 'Resultado'
                        message = {this.state.respuesta}
                        isOpen = {this.state.shwoAlert}
                        buttons= {[{
                                text: 'Aceptar',
                                cssClass: 'primary',
                                handler: () => {
                                    this.props.history.push('/');
                                }
                            }
                        ]}
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
        )
    };
}

export default NuevoPage;
