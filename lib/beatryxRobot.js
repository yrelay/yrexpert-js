/*

!----------------------------------------------------------------------------!
!                                                                            !
! YRexpert : (Your Yrelay) Système Expert sous Mumps GT.M et GNU/Linux       !
! Copyright (C) 2001-2015 by Hamid LOUAKED (HL).                             !
!                                                                            !
!----------------------------------------------------------------------------!

*/



module.exports = {
  init: "init",
  addTo: "init",
  create: "create",
  uuid: "uuid()",
  symbolTable: "symbolTable",
  garbageCollector: "garbageCollector",
  authenticate: "tokenAuthenticate",
  authenticateByJWT: "authenticateByJWT",
  httpAuthenticate: "httpAuthenticate",
  authenticateRestRequest: "authenticateRestRequest",
  active: "getActiveSessions",
  byToken: "getSessionByToken"
};
