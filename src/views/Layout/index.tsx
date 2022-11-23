import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import Loader from "./Loader";
import styles from "./Layout.module.sass";
import Sidebar from "./Sidebar";
import { Helmet } from "react-helmet";
import clsx from "clsx";
import { APP_NAME } from "@/config";
import useParsedQuery from "@hooks/useParsedQuery";
import { useFlash } from "./FlashProvider";
import FlashMessage from "./FlashMessage";

interface Props {
  children?: React.ReactNode;
  containerClassName?: string;
  title?: string;
  subtitle?: string;
  backUrl?: string;
  header?: boolean;
  padding?: boolean;
  actions?: React.ReactNode;
  centered?: boolean;
}

const Layout: React.FC<Props> = ({
  children,
  title,
  subtitle,
  backUrl,
  actions,
  padding = true,
  header = true,
  containerClassName,
  centered
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [{ ref: referrer }] = useParsedQuery();
  const { messages } = useFlash();

  useEffect(() => {
    if (!loading && !user) navigate("/sign-in");
  }, [loading, user]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <div
      className={clsx(styles.root, {
        [styles.noPadding]: !padding && !header
      })}
    >
      <Helmet>
        <title>
          {title || ""}
          {title ? " | " : ""}
          {APP_NAME}
        </title>
      </Helmet>
      <Sidebar />
      <main
        role="main"
        className={clsx(containerClassName, centered && "container")}
      >
        {header ? (
          <header>
            <div className={styles.title}>
              {backUrl || referrer ? (
                <Link to={referrer || backUrl} className={styles.breadcrumb}>
                  &lt;&lt; Back
                </Link>
              ) : null}
              {title ? <h1 className="title">{title}</h1> : null}
              {subtitle ? <h2 className="subtitle">{subtitle}</h2> : null}
            </div>
            {actions ? <div className={styles.actions}>{actions}</div> : null}
          </header>
        ) : null}
        {messages.map(FlashMessage)}
        {children}
      </main>
    </div>
  );
};

export default Layout;
