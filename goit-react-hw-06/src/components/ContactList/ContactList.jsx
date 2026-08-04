import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <ul className={css.list}>
      {visibleContacts.map((contact) => (
        <li key={contact.id} className={css.item}>
          {/* Sadece Contact bileşeni prop alabilir (Kural gereği) */}
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
