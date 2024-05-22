// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IERC20.sol";
import "./IERC3156FlashBorrower.sol";
import "./IERC3156FlashLender.sol";
import "./IUniswapV2Router02.sol";

contract Flashloanbot is IERC3156FlashBorrower, Ownable {

    address public immutable flashloanProvider;
    IUniswapV2Router02 private router;
    IERC20 borrowToken;
    IERC20 swapToken;
    uint256 MAX_INT = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    event executeSuccess(address token, uint256 amountBefore, uint256 amountAfter);
    event withdrawSuccess(address token, uint256 amount);

    constructor(address _flashloanProvider) {
        flashloanProvider = _flashloanProvider;
    }

    function onFlashLoan(
        address ,
        address token,
        uint256 amount,
        uint256 ,
        bytes calldata
    ) external override returns (bytes32) {

        IERC20(token).approve(msg.sender, MAX_INT);
        uint256[] memory amountOuts1 = _swapTokens(address(borrowToken), address(swapToken), amount);
        uint256[] memory amountOuts2 = _swapTokens(address(swapToken), address(borrowToken), amountOuts1[1]);
        require(amountOuts2[1] >= amount, "No profit");

        emit executeSuccess(address(borrowToken), amount, amountOuts2[1]);
        return keccak256('ERC3156FlashBorrower.onFlashLoan');
    }

    function execute(
        address _borrowToken,
        address _swapToken,
        uint256 _amount,
        address _router,
        bytes calldata userData
    ) external {
        require(_amount > 0, "Invalid borrow amount");
        require(_borrowToken != address(0) && _swapToken != address(0), "Invalid token address");
        borrowToken = IERC20(_borrowToken);
        swapToken = IERC20(_swapToken);
        router = IUniswapV2Router02(_router);
        IERC3156FlashLender(flashloanProvider).flashLoan(
            IERC3156FlashBorrower(address(this)),
            _borrowToken,
            _amount,
            userData
        );
    }

    function _swapTokens(
        address tokenA,
        address tokenB,
        uint256 amount
    ) internal returns (uint256[] memory){
        IERC20(tokenA).approve(address(router), amount);
        address[] memory path;
        path = new address[](2);
        path[0] = tokenA;
        path[1] = tokenB;
        uint256[] memory amountOuts = router.swapExactTokensForTokens(
            amount, 0, path, address(this), block.timestamp + 3600
        );
        return amountOuts;
    }

    function withdrawTokens(
        address _token
    ) public onlyOwner {
        IERC20 token = IERC20(_token);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No balance");
        token.transfer(msg.sender, balance);
        emit withdrawSuccess( _token, balance);
    }
}
