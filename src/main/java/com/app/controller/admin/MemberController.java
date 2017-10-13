/**
 *  설문대상자 - Controller
 *
 * @author kang.deokjoon
 * @version 1.0
 * @since 2017-07-04
 */
package com.app.controller.admin;

import java.util.List;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.controller.CommonRestController;
import com.app.common.models.ResponseListVO;
import com.app.models.MemberListRequestVO;
import com.app.models.MemberVO;
import com.app.service.MemberService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Api(value = "MemberController", tags = "메가시너스 고객관리")
@RequestMapping("/admin")
public class MemberController extends CommonRestController {
  
  @Resource
  private MemberService memberService;
  
  @ApiOperation(value = "메가시너스 고객 - 리스트", notes = "메가시너스 고객 리스트")
  @GetMapping(path = "/mssql3-members")
  public ResponseEntity<ResponseListVO> getMemberListSearch(@Valid MemberListRequestVO memberListRequestVO) throws Exception {
    
    List<MemberVO> list = memberService.getMemberList(memberListRequestVO);
    int totalCount = memberService.getMemberListTotalCount(memberListRequestVO);
    
    ResponseListVO responseListVO = new ResponseListVO(totalCount, memberListRequestVO.getPageNumber(), memberListRequestVO.getPageLimit(), list);
    
    return new ResponseEntity<ResponseListVO>(responseListVO, HttpStatus.OK);
  }
}
