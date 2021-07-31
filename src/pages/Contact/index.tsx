import { useState, FormEvent, InputHTMLAttributes, useEffect } from 'react';
import Head from 'next/head';

import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa'

import PageIntroduction from '../../components/PageIntroduction';
import Link from '../../components/Link';

import styles from './Contact.module.scss';
import Modal from '../../components/Modal';
import { useModalContext } from '../../contexts/ModalContext';

type formType = {
  nome: string;
  email: string;
  address: string;
  howMany: string;
  telephone: string;
  order: string;
}
export default function Contact() {

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: -10.9058422,
    longitude: -37.0516275,
    zoom: 15,
  });
  const { isShowModal, handleModalShow } = useModalContext();

  const [form, setForm] = useState<formType>({
    nome: '',
    email: '',
    address: '',
    howMany: '',
    telephone: '',
    order: '',
  });


  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form, [name]: value
    });
  }

  function handleSendForm(event) {
    event.preventDefault();
    handleModalShow(true);

    setForm({
      nome: '',
      email: '',
      address: '',
      howMany: '',
      telephone: '',
      order: '',
    });

  }

  return (

    <>
      <Head>
        <title>Telepizza - Entre em contato e adiquira a sua pizza</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main>
        <section className={styles.contact}>
          <PageIntroduction style={{ background: 'radial-gradient(#DD1D86, #d92027)' }}>
            <div className={styles.headerWrapper}>
              <h2 className="title">Make your Order</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus incidunt et harum alias corporis fugiat!</p>
            </div>
          </PageIntroduction>
          <div className="container">
            <div className={styles.contactContent} >
              <form onSubmit={handleSendForm} className={styles.formContact}>
                <div className="wrap-name">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="nome"
                    value={form.nome}
                    onChange={(event) => handleChange(event)}
                  />
                </div>

                <div className="wrap-email">
                  <input
                    type="email"
                    placeholder="E-mai"
                    required
                    name="email"
                    value={form.email}
                    onChange={(event) => handleChange(event)}
                  />
                </div>

                <div className="wrap-adress">
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    name="address"
                    value={form.address}
                    onChange={(event) => handleChange(event)}
                  />
                </div>

                <div className={styles.wrapHowManyAndTelphone}>
                  <div className={styles.wrapHowMany}>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      placeholder="How many?"
                      name="howMany"
                      value={form.howMany}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>

                  <div className={styles.wrapTelephone}>
                    <input
                      type="text"
                      id="telephone"
                      placeholder="Telephone number"
                      required
                      name="telephone"
                      value={form.telephone}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </div>

                <div className={styles.wrapOrder}>
                  <textarea
                    placeholder="Mais de um sabor? Informe o sabores separados por virgula"
                    required
                    name="order"
                    value={form.order}
                    onChange={(event) => handleChange(event)}
                  ></textarea>
                </div>

                <div className={styles.wrapSubmit}>
                  <button type="submit" className="btn">Enviar</button>
                </div>
              </form>

              <div className={styles.contactData}>
                <div className={styles.address}>
                  <h3 className={styles.subtitle}>Date contact</h3>
                  <ul className="contact-adress">
                    <li>- +55 7 8954-5423</li>
                    <li>- pedidos@telepizza.com</li>
                    <li>- Rua Gracho Cardoso - Brasília</li>
                    <li>- Avenida Brasil - Rio de janeiro</li>
                  </ul>
                </div>

                <div className={styles.socialNetwork}>
                  <h2 className={styles.subtitle}>Redes Sociais</h2>
                  <div className={styles.wrapSocialNetwork}>
                    <Link to="https://www.facebook.com/">
                      <FaFacebookF />
                    </Link>

                    <Link to="https://www.instagram.com/">
                      <FaInstagram />
                    </Link>

                    <Link to="https://twitter.com/">
                      <FaTwitter />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.map}>
              <h3 className={styles.subtitle}>Nossa localização</h3>
              <ReactMapGL {...viewport} onViewportChange={nextViewport => setViewport(nextViewport)} mapboxApiAccessToken={'pk.eyJ1IjoiamZsYXZpbzIyMCIsImEiOiJja3JsMmRrbmo0cW0yMnFyMnhuNGgzMTJjIn0.3SDzYhxk47a-KRzqmEO4qQ'} mapStyle="mapbox://styles/mapbox/outdoors-v11" />
            </div>
          </div>
        </section>
      </main>

      {isShowModal && <Modal name={form.nome} />}
    </>
  );
}