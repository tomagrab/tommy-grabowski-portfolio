import '@/app/DeleteInformation/DeleteInformation.scss';

export default function DeleteInformation() {
  return (
    <div className="DeleteInformation">
      <DeleteInformationHeader />
      <p>
        If you would like to delete your account, you can do so by clicking on
        your profile, select Manage Account, and then select DELETE ACCOUNT.
        This will permanently delete your account and all of your data.
      </p>
    </div>
  );
}

function DeleteInformationHeader() {
  return (
    <div>
      <h2 className="pb-4 text-lg font-bold">Delete Information</h2>
    </div>
  );
}
