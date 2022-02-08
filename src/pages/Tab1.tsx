import {
  IonList,
  IonModal,
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    name: "",
    price: [{ value: "" }],
  });

  useEffect(() => {
    const getSubscriptions = async () => {
      const res = await fetch(
        "https://api.winnerheads.com/api/marketplace/getMarketplaceByIdString/winnerheads"
      );
      const data = await res.json();
      // console.log(data);
      setSubscriptions(data.space.content);
      // console.log(data.space.content);
    };
    getSubscriptions();
  }, []);

  function doThings(data: any) {
    setShowModal(true);
    let bajs = {
      description: subscriptions[data].shoppingItem.description,
      name: subscriptions[data].shoppingItem.name,
      price: subscriptions[data].shoppingItem.price[0].value,
    };
    setModalData(bajs);
    console.log(subscriptions[data]);
  }

  function doThings2(data: any) {
    setShowModal2(true);
    let bajs = {
      description: subscriptions[data].shoppingItem.description,
      name: subscriptions[data].shoppingItem.name,
      price: subscriptions[data].shoppingItem.price[0].value,
    };
    setModalData(bajs);
    console.log(subscriptions[data]);
  }

  const individualCards = [];
  // console.log(subscriptions.length);
  if (subscriptions.length > 0) {
    for (let i = 1; i < 3; i++) {
      individualCards.push(
        <IonCard key={i} className="ion-activated" class="ion-margin-vertical">
          <IonItem button onClick={() => doThings(i)} color="tertiary">
            <IonLabel>{subscriptions[i].shoppingItem.name}</IonLabel>
            <IonLabel>{subscriptions[i].shoppingItem.description}</IonLabel>
          </IonItem>
          <IonModal isOpen={showModal}>
            <p>{modalData.description}</p>
            <p>{modalData.name}</p>
            <p>{modalData.price}</p>
          </IonModal>
        </IonCard>
      );
    }
  }

  const teamCards = [];
  if (subscriptions.length > 0) {
    for (let i = 4; i < subscriptions.length; i++) {
      teamCards.push(
        <IonCard key={i} className="ion-activated" class="ion-margin-vertical">
          <IonItem button onClick={() => doThings2(i)} color="success">
            <IonLabel>{subscriptions[i].shoppingItem.name}</IonLabel>
            <IonLabel>{subscriptions[i].shoppingItem.description}</IonLabel>
          </IonItem>
          <IonModal isOpen={showModal2}>
            <p>{modalData.description}</p>
            <p>{modalData.name}</p>
          </IonModal>
        </IonCard>
      );
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Subscriptions</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {individualCards ? individualCards : null}
        {teamCards ? teamCards : null}

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Subscribe</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
