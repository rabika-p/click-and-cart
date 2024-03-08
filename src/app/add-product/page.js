
import ProductForm from "../components/products/ProductForm";
import SideNav from "../components/sidebar/SideNav";
import TopNav from "../components/topbar/TopNav";
// import withAuth from "../hoc/withAuth";
import FormLayout from "../layouts/layout";

const ProductFormPage = () => {
  return (
    <div className="grid grid-cols-6 h-screen">
      <div className="col-span-1">
        <SideNav />
      </div>
      <div className="col-span-5">
        <TopNav />
        <FormLayout minHeight={"90vh"}>
          <ProductForm mode="add" />
        </FormLayout>
      </div>
    </div>
  );
};

export default ProductFormPage;
