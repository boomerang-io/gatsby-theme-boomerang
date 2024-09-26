/* eslint-disable import/no-unresolved */
import AutomationControlCenter from "@gatsby-theme-boomerang/assets/img/automation-control-center.png";
import AutomationPlatform from "@gatsby-theme-boomerang/assets/img/automation-platform.png";
import Cicd from "@gatsby-theme-boomerang/assets/img/cicd.png";
import Flow from "@gatsby-theme-boomerang/assets/img/flow.png";
import ProcessDeliveryAccelerator from "@gatsby-theme-boomerang/assets/img/process-delivery-accelerator.png";
import Watson from "@gatsby-theme-boomerang/assets/img/watson.png";

export const ContentLabels = {
  AutomationControlCenter: "automation-control-center",
  AutomationPlatform: "automation-platform",
  Cicd: "cicd",
  Flow: "flow",
  ProcessDeliveryAccelerator: "process-delivery-accelerator",
  Watson: "watson",
};

export const contentLabelsToImageMap = {
  [ContentLabels.AutomationControlCenter]: AutomationControlCenter,
  [ContentLabels.AutomationPlatform]: AutomationPlatform,
  [ContentLabels.Cicd]: Cicd,
  [ContentLabels.Flow]: Flow,
  [ContentLabels.ProcessDeliveryAccelerator]: ProcessDeliveryAccelerator,
  [ContentLabels.Watson]: Watson,
};

export const UserPlatformRole = {
  Partner: "partner",
};

export const TeamTypes = {
  ACCOUNT: "account",
  PROJECT: "project",
  STANDARD: "standard",
};

export const TeamLabels = {
  CoreExtProjectId: "coreExtProjectId",
  OpportunityId: "opportunityId",
  Organization: "Organization",
  TeamType: "project-type",
};

export const QueryStatus = {
  Idle: "idle",
  Loading: "loading",
  Error: "error",
  Success: "success",
};

export const RequestType = {
  JoinTeam: "joingroup",
  CreateTeam: "creategroup",
  LeaveTeam: "leavegroup",
  RemoveTeam: "removegroup",
  JoinTool: "jointool",
  CreateTool: "createtool",
  LeaveTool: "leavetool",
  RemoveTool: "removetool",
  LeavePlatform: "leaveplatform",
};

