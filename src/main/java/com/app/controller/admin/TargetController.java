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
import com.app.models.MemberVO;
import com.app.models.TargetListRequestVO;
import com.app.models.TargetListVO;
import com.app.models.TargetVO;
import com.app.service.MemberService;
import com.app.service.TargetService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Api(value = "TargetController", tags = "설문대상자관리")
@RequestMapping("/admin")
public class TargetController extends CommonRestController {
  
  @Resource
  private TargetService targetService;
  
  @Resource
  private MemberService memberService;
  
  @ApiOperation(value = "설문대상자 - 가져오기", notes = "설문대상자 가져오기")
  @GetMapping(path = "/targets/get-members/{surveySrl}")
  public ResponseEntity<Integer> getMembers(@PathVariable String surveySrl) throws Exception {
    
    int result = memberService.getMembers(surveySrl);
    
    return new ResponseEntity<Integer>(result, HttpStatus.OK);
  }
  
  @ApiOperation(value = "설문대상자 - 리스트", notes = "설문대상자 리스트")
  @GetMapping(path = "/targets")
  public ResponseEntity<ResponseListVO> getTargetListSearch(@Valid TargetListRequestVO targetListRequestVO) throws Exception {
    
    List<TargetListVO> list = targetService.getTargetList(targetListRequestVO);
    int totalCount = targetService.getTargetListTotalCount(targetListRequestVO);
    
    ResponseListVO responseListVO = new ResponseListVO(totalCount, targetListRequestVO.getPageNumber(), targetListRequestVO.getPageLimit(), list);
    
    return new ResponseEntity<ResponseListVO>(responseListVO, HttpStatus.OK);
  }
  
  @ApiOperation(value = "설문대상자 - 상세", notes = "설문대상자 상세")
  @GetMapping(path = "/targets/{targetSrl}")
  public ResponseEntity<TargetVO> getTargetDetailSearch(@PathVariable String targetSrl) throws Exception {
    
    TargetVO result = targetService.getTarget(targetSrl);
    
    return new ResponseEntity<TargetVO>(result, HttpStatus.OK);
  }
  
}
