import LayoutAuth from "@/components/layouts/LayoutAuth";
import ViewActivation from "@/components/views/Auth/Activation";
import authService from "@/services/auth.service";

interface PropTypes {
  status: "success" | "failed";
}

const ActivationPage = (props: PropTypes) => {
  return (
    <LayoutAuth title="Activation | SiVolunteer">
      <ViewActivation {...props} />
    </LayoutAuth>
  );
};

export const getServerSideProps = async (context: {
  query: { code: string };
}) => {
  try {
    const { data } = await authService.activation({
      code: context.query.code,
    });
    if (data.data) {
      return {
        props: {
          status: "success",
        },
      };
    } else {
      return {
        props: {
          status: "failed",
        },
      };
    }
  } catch (error) {
    return {
      props: {
        status: "failed",
      },
    };
  }
};

export default ActivationPage;
