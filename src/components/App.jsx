import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './PhonebookContainer.styled';
import { Title } from './Title/AppTitle';
import { ContactForm } from './ContactForm/FormWrapper';
import { SectionTitle } from './Title/SectionTitle';
import { Filter } from './Filter/Filter';
import { ContactList } from './FriendList/FriendList';

const LOKAL_KEY = 'my-contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem(LOKAL_KEY)) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LOKAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onConfirmAddFriend = (evt, name, number) => {
    evt.preventDefault();

    const friendId = nanoid();

    const findedContact = contacts.find(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );

    if (findedContact) {
      alert(`${name} is already in contacts`);
      return;
    } else {
      setContacts([...contacts, { id: friendId, name, number }]);
    }
  };

  const onFriendDelete = friendId => {
    setContacts(contacts.filter(contact => contact.id !== friendId));
  };

  const normalizedName = filter.toLowerCase();

  const filteredFriends = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedName)
  );

  return (
    <Container>
      <Title text="Phonebook" />
      <ContactForm onConfirmAddFriend={onConfirmAddFriend} />
      <SectionTitle text="Contacts" />
      <Filter
        value={filter}
        onFilterChange={evt => setFilter(evt.currentTarget.value)}
      />
      <ContactList list={filteredFriends} onFriendDelete={onFriendDelete} />
    </Container>
  );
};