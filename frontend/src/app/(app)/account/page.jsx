export const metadata = {
  title: "Soundei | Account Settings – Manage Your Profile",
  description:
    "Access your Soundei account settings to manage your profile, update personal information, and customize your music preferences. Secure your account with easy management options, including password updates and privacy settings. Take control of your Soundei experience and enjoy seamless access to your favorite music!",
};

export default async function Accounts() {
  // const session = await getServerSession(authOptions);
  // const fetcherEndPoint = `/users/favorites?querySearch=${""}&maxAudios=${20}`;

  // console.log(session, "From here");
  // try {
  //   const data = await fetchWithApiKey(fetcherEndPoint, { jwt: session.jwt });
  //   console.log(data);
  // } catch (error) {
  //   return (
  //     <p className={"py-6"}>{error.message || "Something went wrong! 😭"}</p>
  //   );
  // }

  return <div>Accounts</div>;
}
