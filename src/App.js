import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AgentsPage from "./pages/agents/AgentsPage";
import LoginPage from "./pages/login/LoginPage";
import CoefficientsPage from "./pages/coefficients/CoefficientsPage";
import GlobalSettingPage from "./pages/globalSetting/GlobalSettingPage";
import StopListPage from "./pages/stopList/StopListPage";
import LanguagePage from "./pages/language/LanguagePage";
// import ContentPage from "./pages/content/ContentPage";
import ArticlesPage from "./pages/articles/ArticlesPage";
import TagsPage from "./pages/tags/TagsPage";
import VacanciesPage from "./pages/vacancies/VacanciesPage";
import ResumePage from "./pages/resume/ResumePage";
import ChangePasswordPage from "./pages/changePassword/ChangePasswordPage";
import Navbar from './components/navbar/Navbar';
import './index.css';
import Header from "./components/header/Header";
import Edit from "./components/edit/Edit";
import Add from "./components/add/Add";
import ResumeDetails from "./pages/resumeDetails/ResumeDetails";
import TestimonialsPage from "./pages/testimonials/TestimonialsPage";
import RequestRegistration from "./pages/requestRegistration/RequestRegistration";
import RequestRegistrationDetails from "./pages/requestRegistrationDetails/RequestRegistrationDetails";

function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="main">
      {location.pathname !== '/' && <Header />}
      {location.pathname !== '/' && <Navbar />}
      <div className="main__content">
        {children}
      </div>
    </div>
  );
}

function App() {

  const renderPageWithLayout = (Component) => (
    <Layout>
      <Component />
    </Layout>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/agents" element={renderPageWithLayout(AgentsPage)} />
        <Route path="/coefficients" element={renderPageWithLayout(CoefficientsPage)} />
        <Route path="/globalSetting" element={renderPageWithLayout(GlobalSettingPage)} />
        <Route path="/requestRegister" element={renderPageWithLayout(RequestRegistration)} />
        <Route path="/requestRegister/details/:id" element={renderPageWithLayout(RequestRegistrationDetails)} />
        <Route path="/stopList" element={renderPageWithLayout(StopListPage)} />
        <Route path="/testimonials" element={renderPageWithLayout(TestimonialsPage)} />
        <Route path="/languages" element={renderPageWithLayout(LanguagePage)} />
        <Route path="/articles" element={renderPageWithLayout(ArticlesPage)} />
        <Route path="/tags" element={renderPageWithLayout(TagsPage)} />
        <Route path="/vacancies" element={renderPageWithLayout(VacanciesPage)} />
        <Route path="/resume" element={renderPageWithLayout(ResumePage)} />
        <Route path="/changePassword" element={renderPageWithLayout(ChangePasswordPage)} />
        <Route path="/vacancies/edit/:id" element={renderPageWithLayout(Edit)} />
        <Route path="/vacancies/add" element={renderPageWithLayout(Add)} />
        <Route path="/resume/details/:id" element={renderPageWithLayout(ResumeDetails)} />
        <Route path="/articles/add" element={renderPageWithLayout(Add)} />
        <Route path="/articles/edit/:id" element={renderPageWithLayout(Edit)} />
        <Route path="/testimonials/add" element={renderPageWithLayout(Add)} />
        <Route path="/testimonials/edit/:id" element={renderPageWithLayout(Edit)} />
      </Routes>
    </Router>
  );
}

export default App;
