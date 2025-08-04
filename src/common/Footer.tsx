import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-yellow-700 text-yellow-300">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-center">
          {t('footer.copyright', { year })} · {t('footer.rights')}
        </p>

        <div className="flex gap-4">
          <a href="/termos" className="hover:text-yellow-400 transition">
            {t('footer.terms')}
          </a>
          <a href="/privacidade" className="hover:text-yellow-400 transition">
            {t('footer.privacy')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
