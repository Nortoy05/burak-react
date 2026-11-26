import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useEffect, useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";


export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage 
      ? `${serverApi}/${authMember.memberImage}` 
      : "/icons/default-user.svg"
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      _id: authMember?._id ?? "",
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    }
  );

  // Refresh the form when the saved member changes in the global context.
  useEffect(() => {
    if (!authMember) return;
    setMemberUpdateInput({
      _id: authMember._id ?? "",
      memberNick: authMember.memberNick,
      memberPhone: authMember.memberPhone,
      memberAddress: authMember.memberAddress,
      memberDesc: authMember.memberDesc,
      memberImage: authMember.memberImage,
    });
    setMemberImage(authMember.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg");
  }, [authMember]);

  /**  HANDLERS **/

  const memberNickHandler = (e: T) => {
    setMemberUpdateInput((current) => ({ ...current, memberNick: e.target.value }));
  };

  const memberPhoneHandler = (e: T) => {
    setMemberUpdateInput((current) => ({ ...current, memberPhone: e.target.value }));
  };

  const memberAddressHandler = (e: T) => {
    setMemberUpdateInput((current) => ({ ...current, memberAddress: e.target.value }));
  };

  const memberDescriptionHandler = (e: T) => {
    setMemberUpdateInput((current) => ({ ...current, memberDesc: e.target.value }));
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" || 
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" || 
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);
      setMemberUpdateInput({
        _id: result._id ?? authMember._id ?? "",
        memberNick: result.memberNick,
        memberPhone: result.memberPhone,
        memberAddress: result.memberAddress,
        memberDesc: result.memberDesc,
        memberImage: result.memberImage,
      });
      setMemberImage(result.memberImage
        ? `${serverApi}/${result.memberImage}`
        : "/icons/default-user.svg");
      
      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then()
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileType = file.type,
      validateImageTypes = ["image/jpg", "image/png", "image/jpeg"];

      if (!validateImageTypes.includes(fileType)) {
        sweetErrorHandling(Messages.error5).then();
      } else {
        if (file) {
          setMemberUpdateInput((current) => ({ ...current, memberImage: file }));
          setMemberImage(URL.createObjectURL(file));
        }
      }
  };
  
  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={memberImage} className={"mb-image"} />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label" onChange={handleImageViewer}>
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}> 
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "no phone"}
            value={memberUpdateInput.memberPhone}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={
              authMember?.memberAddress 
               ? authMember?.memberAddress 
               : "no address"
              }
            value={memberUpdateInput.memberAddress}
            name="memberAddress"
            onChange={memberAddressHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={
              authMember?.memberDesc 
               ? authMember?.memberDesc 
               : "no description"
              }
            value={memberUpdateInput.memberDesc}
            name="memberDesc"
            onChange={memberDescriptionHandler}
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"} onClick={handleSubmitButton}>Save</Button>
      </Box>
    </Box>
  );
}
