import useAuth from "@hooks/useAuth";
import styles from "../Layout.module.sass";
import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { APP_NAME } from "@/config";
import StoreOpenSection from "@components/store/StoreOpenSection";
import { SidebarButton } from "@components/buttons";

const Sidebar = () => {
  const { signOut, user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.title}>
        <h1 className="title">{APP_NAME}</h1>
      </Link>
      <nav>
        <SidebarLink to="/">Incoming orders</SidebarLink>
        <SidebarLink to="/orders">Order history</SidebarLink>
        <SidebarLink to="/products">Products</SidebarLink>
      </nav>
      <StoreOpenSection />
      <section className={styles.userData}>
        <p>Current user:</p>
        <p className={styles.userName}>{user?.email}</p>
      </section>
      <SidebarButton onClick={signOut} className={styles.logout}>
        Sign out
      </SidebarButton>
    </aside>
  );
};

export default Sidebar;
